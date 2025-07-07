const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const { initiatePayment, verifyPayment } = require('../utils/payment');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res, next) => {
  try {
    const { slot_id, amount_paid } = req.body;

    // Get slot details
    const slot = await Slot.findById(slot_id);
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Slot not found'
      });
    }

    // Check if slot is available
    if (slot.is_booked) {
      return res.status(400).json({
        success: false,
        message: 'Slot is already booked'
      });
    }

    // Validate amount
    if (amount_paid < slot.price_per_hr) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient payment amount'
      });
    }

    // Create booking with payment
    const result = await Slot.bookSlot(slot_id, req.user.id, {
      amount_paid,
      payment_status: 'pending'
    });

    // Initiate payment (Razorpay placeholder)
    const paymentOrder = await initiatePayment({
      amount: amount_paid,
      currency: 'INR',
      receipt: `booking_${result.booking.id}`,
      notes: {
        booking_id: result.booking.id,
        user_id: req.user.id,
        slot_id: slot_id
      }
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        booking: result.booking,
        slot: result.slot,
        payment_order: paymentOrder
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user can access this booking
    if (booking.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: { booking }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res, next) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    
    const bookings = await Booking.findByUser(
      req.user.id,
      parseInt(limit),
      parseInt(offset)
    );

    res.json({
      success: true,
      data: { bookings },
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: bookings.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Owner/Admin)
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check permissions
    if (booking.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update booking status
    const updatedBooking = await Booking.updateStatus(req.params.id, status);

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: { booking: updatedBooking }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check permissions
    if (booking.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if booking can be cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    // Cancel booking
    await Booking.cancel(req.params.id);

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify payment
// @route   POST /api/bookings/:id/verify-payment
// @access  Private
const verifyBookingPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check permissions
    if (booking.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Verify payment
    const isPaymentValid = verifyPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    });

    if (!isPaymentValid) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

    // Update booking payment status
    const updatedBooking = await Booking.updatePaymentStatus(
      req.params.id,
      'paid',
      razorpay_payment_id
    );

    // Update booking status to confirmed
    await Booking.updateStatus(req.params.id, 'confirmed');

    res.json({
      success: true,
      message: 'Payment verified and booking confirmed',
      data: { booking: updatedBooking }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking statistics
// @route   GET /api/bookings/stats
// @access  Private (Admin)
const getBookingStats = async (req, res, next) => {
  try {
    const { date_from, date_to, venue_id } = req.query;
    
    const stats = await Booking.getStats({
      date_from,
      date_to,
      venue_id: venue_id ? parseInt(venue_id) : undefined
    });

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getBookingById,
  getMyBookings,
  updateBookingStatus,
  cancelBooking,
  verifyBookingPayment,
  getBookingStats
}; 