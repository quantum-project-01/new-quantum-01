import { Prisma, PrismaClient } from "@prisma/client";
import {
  Booking,
  BookingStatus,
  customerDetails,
  paymentDetails,
  PaymentStatus,
} from "../../models/booking.model";
import { SlotAvailability } from "../../models/venue.model";

const prisma = new PrismaClient();

export class BookingService {
  static async createBookingBeforePayment(booking: Booking) {
    try {
      // Create booking using transaction to ensure data consistency
      const result = await prisma.$transaction(async (tx) => {
        // Create the booking
        const newBooking = await tx.booking.create({
          data: {
            userId: booking.userId,
            partnerId: booking.partnerId,
            venueId: booking.venueId,
            activityId: booking.activityId,
            facilityId: booking.facilityId,
            amount: booking.amount,
            duration: booking.duration, // Note: matches schema typo "duaration"
            startTime: booking.startTime,
            endTime: booking.endTime,
            numberOfSlots: booking.numberOfSlots,
            bookedDate: booking.bookedDate,
            confirmedAt: booking.confirmedAt || null,
            cancelledAt: booking.cancelledAt || null,
            bookingStatus: booking.bookingStatus,
            paymentStatus: booking.paymentStatus,
            customerDetails:
              booking.customerDetails as unknown as Prisma.InputJsonValue,
          },
        });

        // Update all slots with the booking ID
        await tx.slot.updateMany({
          where: {
            id: {
              in: booking.slotIds,
            },
          },
          data: {
            bookingId: newBooking.id,
            availability: SlotAvailability.Locked,
          },
        });

        return newBooking;
      });

      return result;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }

  static async getBookingById(id: string): Promise<Booking> {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
          slots: {
            select: {
              id: true,
              date: true,
              startTime: true,
              endTime: true,
              amount: true,
              availability: true,
            },
          },
        },
      });

      if (!booking) {
        throw new Error("booking not found");
      }

      const bookingData: Booking = {
        id: booking.id,
        userId: booking.userId,
        partnerId: booking.partnerId,
        venueId: booking.venueId,
        facilityId: booking.facilityId,
        slotIds: booking.slots.map((slot) => slot.id),
        activityId: booking.activityId,
        amount: Number(booking.amount),
        duration: booking.duration,
        startTime: booking.startTime,
        endTime: booking.endTime,
        numberOfSlots: booking.numberOfSlots,
        bookedDate: booking.bookedDate,
        confirmedAt: booking.confirmedAt,
        cancelledAt: booking.cancelledAt,
        bookingStatus: booking.bookingStatus as BookingStatus,
        paymentStatus: booking.paymentStatus as PaymentStatus,
        customerDetails: booking?.customerDetails as unknown as customerDetails,
        paymentDetails: booking?.paymentDetails as unknown as paymentDetails,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      };
      return bookingData;
    } catch (error) {
      console.error("Error getting booking by id:", error);
      throw error;
    }
  }

  static async getBookingsByUserId(userId: string) {
    try {
      const bookings = await prisma.booking.findMany({
        where: { userId },
        include: {
          slots: {
            select: {
              id: true,
              date: true,
              startTime: true,
              endTime: true,
              amount: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return bookings;
    } catch (error) {
      console.error("Error getting bookings by user id:", error);
      throw error;
    }
  }

  static async cancelBooking(id: string, _cancellationReason?: string) {
    try {
      const result = await prisma.$transaction(async (tx) => {
        // Update booking status
        const cancelledBooking = await tx.booking.update({
          where: { id },
          data: {
            bookingStatus: "cancelled",
            cancelledAt: new Date(),
          },
        });

        // Release the slots
        await tx.slot.updateMany({
          where: {
            bookingId: id,
          },
          data: {
            bookingId: null,
            availability: "available",
          },
        });

        return cancelledBooking;
      });

      return result;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw error;
    }
  }
}
