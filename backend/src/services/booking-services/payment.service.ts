import Razorpay from "razorpay";
import { Currency, PaymentMethod } from "../../models/payment.model";
import { PrismaClient } from "@prisma/client";
import { createHmac } from "crypto";
import { PaymentStatus, BookingStatus } from "../../models/booking.model";
import { SlotAvailability } from "../../models/venue.model";
import { withRetries } from "../../utils/retryFunction";

const prisma = new PrismaClient();
const razorpayKey = process.env["RAZORPAY_KEY_ID"]!;
const razorpaySecret = process.env["RAZORPAY_KEY_SECRET"]!;

export class PaymentService {
  static async createPaymentRazorpay({
    amount,
    bookingId,
    venueId,
    customerId,
    partnerId,
    currency = Currency.INR,
  }: {
    amount: number;
    bookingId: string;
    venueId: string;
    customerId: string;
    partnerId: string;
    currency: Currency;
  }) {
    try {
      const razorpay = new Razorpay({
        key_id: razorpayKey,
        key_secret: razorpaySecret,
      });

      const order = await razorpay.orders.create({
        amount: Math.round(amount * 100), // Razorpay expects amount in paise
        currency: currency,
        receipt: bookingId,
        notes: {
          venueId,
          customerId,
          partnerId,
        },
      });

      if (!order) {
        throw new Error("Failed to create Razorpay order");
      }

      return order;
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      throw error;
    }
  }

  static async createTransaction({
    orderId,
    bookingId,
    amount,
    currency = Currency.INR,
    paymentMethod = PaymentMethod.Razorpay,
  }: {
    orderId: string;
    bookingId: string;
    amount: number;
    currency: Currency;
    paymentMethod: PaymentMethod;
  }) {
    try {
      const transaction = await prisma.transactionHistory.create({
        data: {
          bookingId,
          orderId: orderId,
          paymentAmount: amount,
          paymentCurrency: currency,
          paymentMethod: paymentMethod,
          isRefunded: false,
          paymentDate: new Date(),
        },
      });

      return transaction;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  }

  static async verifyPaymentSignature({
    orderId,
    paymentId,
    signature,
  }: {
    orderId: string;
    paymentId: string;
    signature: string;
  }) {
    try {
      const data = `${orderId}|${paymentId}`;
      const expectedSignature = createHmac("sha256", razorpaySecret)
        .update(data)
        .digest("hex");

      if (expectedSignature !== signature) {
        throw new Error("Invalid payment signature");
      }

      return true;
    } catch (error) {
      console.error("Error verifying payment signature:", error);
      throw error;
    }
  }

  static async handleBooking({
    success,
    bookingId,
    amount,
    orderId,
    paymentId,
  }: {
    success: boolean;
    bookingId: string;
    amount: number;
    orderId: string;
    paymentId: string;
  }) {
    try {
      // Step 1: Try transactional logic (retry 3 times)
      await withRetries(
        async () => {
          await prisma.$transaction(async (tx) => {
            const booking = await tx.booking.findUnique({
              where: { id: bookingId },
            });
            if (
              !booking ||
              booking.paymentStatus === PaymentStatus.Paid ||
              booking.bookingStatus === BookingStatus.Confirmed
            )
              return;

            if (success) {
              await tx.booking.update({
                where: { id: bookingId },
                data: {
                  confirmedAt: new Date(),
                  bookingStatus: BookingStatus.Confirmed,
                  paymentStatus: PaymentStatus.Paid,
                  paymentDetails: {
                    paymentAmount: amount,
                    paymentMethod: PaymentMethod.Razorpay,
                    paymentDate: new Date(),
                    isRefunded: false,
                    razorpayOrderId: orderId,
                    razorpayPaymentId: paymentId,
                  },
                },
              });

              await tx.slot.updateMany({
                where: { bookingId },
                data: {
                  availability: SlotAvailability.Booked,
                },
              });

              await tx.transactionHistory.update({
                where: { orderId },
                data: {
                  captured: true,
                  capturedAt: new Date(),
                  razorpayPaymentId: paymentId,
                },
              });
            } else {
              await tx.booking.update({
                where: { id: bookingId },
                data: {
                  paymentStatus: PaymentStatus.Failed,
                  bookingStatus: BookingStatus.Failed,
                  paymentDetails: {
                    paymentAmount: amount,
                    paymentMethod: PaymentMethod.Razorpay,
                    paymentDate: new Date(),
                    isRefunded: false,
                    razorpayOrderId: orderId,
                  },
                },
              });

              await tx.slot.updateMany({
                where: { bookingId },
                data: {
                  availability: SlotAvailability.Available,
                },
              });

              await tx.transactionHistory.update({
                where: { orderId },
                data: {
                  isRefunded: false,
                  captured: false,
                },
              });
            }
          });
        },
        3,
        1000
      ); // Retry transactional part 3 times
    } catch (error) {
      console.error("Transaction failed after retries:", error);
      const fallbackStatus = {
        bookingStatus: false,
        slotStatus: false,
        transactionStatus: false,
      };

      await withRetries(
        async () => {
          const fallbackTasks: Promise<any>[] = [];

          if (!fallbackStatus.bookingStatus) {
            fallbackTasks.push(
              this.handleBookingUpdate(
                bookingId,
                success,
                amount,
                orderId,
                paymentId
              )
            );
          }

          if (!fallbackStatus.slotStatus) {
            fallbackTasks.push(this.handleSlotAfterBooking(bookingId, success));
          }

          if (!fallbackStatus.transactionStatus) {
            fallbackTasks.push(
              this.handleTransactionAfterBooking(orderId, paymentId, success)
            );
          }

          const results = await Promise.allSettled(fallbackTasks);
          console.log("Fallback cleanup results:", results);

          // Update fallbackStatus based on result of each promise
          results.forEach((result, index) => {
            if (result.status === "fulfilled") {
              if (index === 0) fallbackStatus.bookingStatus = true;
              if (index === 1) fallbackStatus.slotStatus = true;
              if (index === 2) fallbackStatus.transactionStatus = true;
            } else {
              console.warn(`Fallback step ${index} failed:`, result.reason);
            }
          });
        },
        3,
        1000
      ).catch((fallbackError) => {
        console.error("Fallback retry failed:", fallbackError);
        // Optional: Alert/log to external service (Sentry, Slack, etc.)
      });
    }
  }

  static async handleSlotAfterBooking(bookingId: string, success: boolean) {
    try {
      if (success) {
        await prisma.slot.updateMany({
          where: { bookingId },
          data: {
            availability: SlotAvailability.Booked,
          },
        });
      } else {
        prisma.slot.updateMany({
          where: { bookingId },
          data: {
            availability: SlotAvailability.Available,
          },
        });
      }
    } catch (error) {
      console.error("Error handling slot after booking:", error);
      throw error;
    }
  }

  static async handleTransactionAfterBooking(
    orderId: string,
    paymentId: string,
    success: boolean
  ) {
    try {
      if (success) {
        await prisma.transactionHistory.update({
          where: { orderId },
          data: {
            captured: true,
            capturedAt: new Date(),
            razorpayPaymentId: paymentId,
            isRefunded: false,
          },
        });
      } else {
        await prisma.transactionHistory.update({
          where: { orderId },
          data: {
            captured: false,
            isRefunded: false,
          },
        });
      }
    } catch (error) {
      console.error("Error handling transaction after booking:", error);
      throw error;
    }
  }

  static async handleBookingUpdate(
    bookingId: string,
    success: boolean,
    amount: number,
    orderId: string,
    paymentId: string
  ) {
    try {
      if (success) {
        await prisma.booking.update({
          where: { id: bookingId },
          data: {
            confirmedAt: new Date(),
            bookingStatus: BookingStatus.Confirmed,
            paymentStatus: PaymentStatus.Paid,
            paymentDetails: {
              paymentAmount: amount,
              paymentMethod: PaymentMethod.Razorpay,
              paymentDate: new Date(),
              isRefunded: false,
              razorpayOrderId: orderId,
              razorpayPaymentId: paymentId,
            },
          },
        });
      } else {
        await prisma.booking.update({
          where: { id: bookingId },
          data: {
            paymentStatus: PaymentStatus.Failed,
            bookingStatus: BookingStatus.Failed,
            paymentDetails: {
              paymentAmount: amount,
              paymentMethod: PaymentMethod.Razorpay,
              paymentDate: new Date(),
              isRefunded: false,
              razorpayOrderId: orderId,
            },
          },
        });
      }
    } catch (error) {
      console.error("Error handling booking update:", error);
      throw error;
    }
  }
}

/**
 * Razorpay Webhook Handling Strategy
 * ----------------------------------
 *
 * This endpoint processes Razorpay webhook POST requests for payment events such as:
 *  - payment.failed
 *  - payment.captured
 *  - order.paid
 *
 * Workflow:
 * 1. Razorpay sends webhook requests to this endpoint whenever an event occurs.
 * 2. Each request contains a payload and a signature in the `x-razorpay-signature` header.
 * 3. Verify the signature using HMAC-SHA256 with your Razorpay secret key to ensure authenticity.
 * 4. If verification passes, process the event accordingly:
 *    - Update transaction/order status in your database.
 *    - Handle idempotency because Razorpay may send the same webhook multiple times.
 * 5. Respond with HTTP 200 OK to acknowledge successful processing.
 *
 * Security:
 *  - Reject requests with invalid signatures (respond with 400).
 *  - Keep your webhook secret key safe and do not expose it publicly.
 *
 * Testing:
 *  - Use Razorpay Dashboard's webhook simulation tool to send test webhooks.
 *  - Webhooks are only simulated in test mode.
 *
 * Sample verification & event handling code:
 *
 * ```
 * import { createHmac } from "crypto";
 *
 * const signature = req.headers["x-razorpay-signature"];
 * const body = JSON.stringify(req.body);
 * const expectedSignature = createHmac("sha256", RAZORPAY_SECRET)
 *   .update(body)
 *   .digest("hex");
 *
 * if (signature !== expectedSignature) {
 *   // Invalid signature, reject request
 *   res.status(400).send("Invalid signature");
 *   return;
 * }
 *
 * const event = req.body.event;
 * if (event === "payment.failed") {
 *   // Mark payment as failed in DB
 * } else if (event === "order.paid") {
 *   // Mark order as paid in DB
 * }
 *
 * res.status(200).send("OK");
 * ```
 *
 * Notes:
 * - Ensure your DB updates are idempotent to handle retries.
 * - Log webhook processing for monitoring and debugging.
 */
