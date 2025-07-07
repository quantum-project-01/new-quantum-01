const express = require('express');
const router = express.Router();

const Venue = require('../models/Venue');
const Booking = require('../models/Booking');
const { authenticate, authorize } = require('../middleware/auth');
const {
  validateId,
  validatePagination,
  handleValidationErrors
} = require('../middleware/validation');

const { body } = require('express-validator');

// All routes require admin authentication
router.use(authenticate);
router.use(authorize('admin'));

// @desc    Get pending venues for approval
// @route   GET /api/admin/venues/pending
// @access  Private (Admin only)
router.get('/venues/pending', validatePagination, async (req, res, next) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    
    const venues = await Venue.findAll({
      approved: false,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: { venues },
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: venues.length
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Approve/reject venue
// @route   PUT /api/admin/venues/:id/approval
// @access  Private (Admin only)
router.put('/venues/:id/approval', [
  validateId[0], // Get the param validation
  body('approved')
    .isBoolean()
    .withMessage('Approved must be true or false'),
  body('admin_notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Admin notes must not exceed 500 characters'),
  handleValidationErrors
], async (req, res, next) => {
  try {
    const { approved, admin_notes } = req.body;
    
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({
        success: false,
        message: 'Venue not found'
      });
    }

    const updatedVenue = await Venue.updateApprovalStatus(
      req.params.id,
      approved,
      admin_notes
    );

    res.json({
      success: true,
      message: `Venue ${approved ? 'approved' : 'rejected'} successfully`,
      data: { venue: updatedVenue }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all venues (including unapproved)
// @route   GET /api/admin/venues
// @access  Private (Admin only)
router.get('/venues', validatePagination, async (req, res, next) => {
  try {
    const {
      sport_type,
      location,
      approved,
      limit = 20,
      offset = 0
    } = req.query;

    const filters = {
      sport_type,
      location,
      approved: approved !== undefined ? approved === 'true' : undefined,
      limit: parseInt(limit),
      offset: parseInt(offset)
    };

    const venues = await Venue.findAll(filters);

    res.json({
      success: true,
      data: { venues },
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: venues.length
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all bookings
// @route   GET /api/admin/bookings
// @access  Private (Admin only)
router.get('/bookings', [
  validatePagination[0], // Get pagination validation
  validatePagination[1],
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'cancelled', 'completed'])
    .withMessage('Status must be one of: pending, confirmed, cancelled, completed'),
  body('payment_status')
    .optional()
    .isIn(['pending', 'paid', 'failed', 'refunded'])
    .withMessage('Payment status must be one of: pending, paid, failed, refunded'),
  handleValidationErrors
], async (req, res, next) => {
  try {
    const {
      status,
      payment_status,
      date_from,
      date_to,
      limit = 20,
      offset = 0
    } = req.query;

    const filters = {
      status,
      payment_status,
      date_from,
      date_to,
      limit: parseInt(limit),
      offset: parseInt(offset)
    };

    const bookings = await Booking.findAll(filters);

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
});

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private (Admin only)
router.get('/dashboard', async (req, res, next) => {
  try {
    // Get various statistics
    const [
      totalVenues,
      pendingVenues,
      approvedVenues,
      bookingStats
    ] = await Promise.all([
      Venue.findAll({ limit: 1000 }),
      Venue.findAll({ approved: false, limit: 1000 }),
      Venue.findAll({ approved: true, limit: 1000 }),
      Booking.getStats()
    ]);

    const stats = {
      venues: {
        total: totalVenues.length,
        pending: pendingVenues.length,
        approved: approvedVenues.length
      },
      bookings: bookingStats
    };

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Force delete venue
// @route   DELETE /api/admin/venues/:id
// @access  Private (Admin only)
router.delete('/venues/:id', validateId, async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({
        success: false,
        message: 'Venue not found'
      });
    }

    await Venue.delete(req.params.id);

    res.json({
      success: true,
      message: 'Venue deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 