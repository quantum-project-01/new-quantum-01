import { PrismaClient } from "@prisma/client";
import { Booking } from "../models/booking.model";

const prisma = new PrismaClient();

export class BookingService {
  static async createBooking(booking: Booking, slotIds: string[]) {
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
            duaration: booking.duration, // Note: matches schema typo "duaration"
            startTime: booking.startTime,
            endTime: booking.endTime,
            numberOfSlots: booking.numberOfSlots,
            bookedDate: booking.bookedDate,
            confirmedAt: booking.confirmedAt || null,
            cancelledAt: booking.cancelledAt || null,
            bookingStatus: booking.bookingStatus as any,
            paymentStatus: booking.paymentStatus as any,
            customerDetails: booking.customerDetails as any,
            paymentDetails: booking.paymentDetails as any,
          },
        });

        // Update all slots with the booking ID
        await tx.slot.updateMany({
          where: {
            id: {
              in: slotIds
            }
          },
          data: {
            bookingId: newBooking.id,
            availability: 'booked'
          }
        });

        return newBooking;
      });

      return result;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }

  static async getBookingById(id: string) {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true
            }
          },
          slots: {
            select: {
              id: true,
              date: true,
              startTime: true,
              endTime: true,
              amount: true,
              availability: true
            }
          }
        }
      });
      return booking;
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
              amount: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      return bookings;
    } catch (error) {
      console.error("Error getting bookings by user id:", error);
      throw error;
    }
  }

  static async cancelBooking(id: string, cancellationReason?: string) {
    try {
      const result = await prisma.$transaction(async (tx) => {
        // Update booking status
        const cancelledBooking = await tx.booking.update({
          where: { id },
          data: {
            bookingStatus: 'cancelled',
            cancelledAt: new Date()
          }
        });

        // Release the slots
        await tx.slot.updateMany({
          where: {
            bookingId: id
          },
          data: {
            bookingId: null,
            availability: 'available'
          }
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
