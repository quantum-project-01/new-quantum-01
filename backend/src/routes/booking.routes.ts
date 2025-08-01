import { Router } from 'express';
import { BookingController } from '../controllers/booking-controller/booking.contoller';

const router = Router();

// Booking Routes
router.post('/create-booking-before-payment', BookingController.createBookingBeforePayment);
router.post('/booking-payment/:bookingId', BookingController.createBookingPayment);
router.post('/verify-payment-and-booking/:id', BookingController.verifyPaymentAndBooking);
router.get('/get-booking/:id', BookingController.getBookingById);
router.get('/get-bookings-by-user/:userId', BookingController.getBookingsByUser);
router.put('/cancel-booking/:id', BookingController.cancelBooking);

export default router; 