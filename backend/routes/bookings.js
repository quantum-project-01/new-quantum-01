const express = require('express');
const router = express.Router();

const {
  createBooking,
  getBookingById,
  getMyBookings,
  updateBookingStatus,
  cancelBooking,
  verifyBookingPayment,
  getBookingStats
} = require('../controllers/bookingController');

const { authenticate, authorize } = require('../middleware/auth');
const {
  validateBookingCreation,
  validateId,
  validatePagination,
  validateDateRange,
  handleValidationErrors
} = require('../middleware/validation');

const { body } = require('express-validator');

// All routes require authentication
router.use(authenticate);

// User routes
router.post('/', validateBookingCreation, createBooking);
router.get('/my-bookings', validatePagination, getMyBookings);
router.get('/:id', validateId, getBookingById);

router.put('/:id/status', [
  validateId[0], // Get the param validation
  body('status')
    .isIn(['pending', 'confirmed', 'cancelled', 'completed'])
    .withMessage('Status must be one of: pending, confirmed, cancelled, completed'),
  handleValidationErrors
], updateBookingStatus);

router.delete('/:id', validateId, cancelBooking);

router.post('/:id/verify-payment', [
  validateId[0], // Get the param validation
  body('razorpay_order_id').notEmpty().withMessage('Razorpay order ID is required'),
  body('razorpay_payment_id').notEmpty().withMessage('Razorpay payment ID is required'),
  body('razorpay_signature').notEmpty().withMessage('Razorpay signature is required'),
  handleValidationErrors
], verifyBookingPayment);

// Admin routes
router.get('/admin/stats', 
  authorize('admin'),
  validateDateRange,
  getBookingStats
);

 