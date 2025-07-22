import { Request, Response } from "express";
import { BookingService } from "../../services/booking.service";
import { Booking } from "../../models/booking.model";
import { SlotService } from "../../services/slot.service";

export class BookingController {
  static async createBookingBeforePayment(req: Request, res: Response) {
    try {
      const bookingData = req.body as Booking;

      // Validate required fields
      if (
        !bookingData.userId ||
        !bookingData.partnerId ||
        !bookingData.venueId ||
        !bookingData.facilityId ||
        !bookingData.slotIds ||
        !bookingData.activityId ||
        !bookingData.amount ||
        !bookingData.startTime ||
        !bookingData.endTime
      ) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      const startTime = Number(bookingData.startTime);
      const endTime = Number(bookingData.endTime);
      const duration = endTime - startTime;
      
      if (
        isNaN(startTime) ||
        isNaN(endTime)
      ) {
        return res.status(400).json({ message: "Invalid startTime, endTime, or duration" });
      }

      if(duration % 30 !== 0) {
        return res.status(400).json({ message: "Duration must be a multiple of 30" });
      }

      const durationInMinutes = endTime - startTime;
      const numberOfSlots = durationInMinutes / 30;

      if (
        !Array.isArray(bookingData.slotIds) ||
        bookingData.slotIds.length === 0
      ) {
        return res
          .status(400)
          .json({ message: "slotIds must be a non-empty array" });
      }

      // Check slot availability
      const allSlotsAvailable = await SlotService.areAllSlotsAvailable(
        bookingData.slotIds
      );

      if (!allSlotsAvailable) {
        return res.status(400).json({
          message: "Some slots are not available or do not exist",
        });
      }

      // Create booking object
      const booking = {
        userId: bookingData.userId,
        partnerId: bookingData.partnerId,
        venueId: bookingData.venueId,
        facilityId: bookingData.facilityId,
        slotIds: bookingData.slotIds,
        activityId: bookingData.activityId,
        amount: bookingData.amount,
        duration: duration,
        numberOfSlots: numberOfSlots,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        bookedDate: new Date(bookingData.bookedDate),
        confirmedAt: bookingData.confirmedAt
          ? new Date(bookingData.confirmedAt)
          : undefined,
        cancelledAt: bookingData.cancelledAt
          ? new Date(bookingData.cancelledAt)
          : undefined,
        bookingStatus: bookingData.bookingStatus,
        paymentStatus: bookingData.paymentStatus,
        customerDetails: bookingData.customerDetails,
        paymentDetails: bookingData.paymentDetails,
      } as Booking;

      const createdBooking = await BookingService.createBooking(
        booking,
        bookingData.slotIds
      );

      return res.status(201).json({
        message: "Booking created successfully",
        data: createdBooking,
      });
    } catch (error: any) {
      console.error("Error creating booking:", error);
      return res.status(500).json({
        message: "Failed to create booking",
        error: error.message,
      });
    }
  }

  static async getBookingById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Booking ID is required" });
      }

      const booking = await BookingService.getBookingById(id);

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      return res.status(200).json({ data: booking });
    } catch (error: any) {
      console.error("Error getting booking:", error);
      return res.status(500).json({
        message: "Failed to get booking",
        error: error.message,
      });
    }
  }

  static async getBookingsByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const bookings = await BookingService.getBookingsByUserId(userId);

      return res.status(200).json({
        data: bookings,
        total: bookings.length,
      });
    } catch (error: any) {
      console.error("Error getting user bookings:", error);
      return res.status(500).json({
        message: "Failed to get user bookings",
        error: error.message,
      });
    }
  }

  static async cancelBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { cancellationReason } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Booking ID is required" });
      }

      const cancelledBooking = await BookingService.cancelBooking(
        id,
        cancellationReason
      );

      return res.status(200).json({
        message: "Booking cancelled successfully",
        data: cancelledBooking,
      });
    } catch (error: any) {
      console.error("Error cancelling booking:", error);
      return res.status(500).json({
        message: "Failed to cancel booking",
        error: error.message,
      });
    }
  }
}
