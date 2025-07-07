const Venue = require('../models/Venue');
const Slot = require('../models/Slot');
const { uploadToCloudinary } = require('../utils/cloudinary');

// @desc    Create a new venue
// @route   POST /api/venues
// @access  Private (Partner/Admin)
const createVenue = async (req, res, next) => {
  try {
    const {
      name,
      location,
      sport_type,
      price_per_hr,
      description,
      contact_phone,
      contact_email,
      amenities
    } = req.body;

    // Handle image uploads
    let images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, file.originalname);
        images.push(result.secure_url);
      }
    }

    // Create venue
    const venue = await Venue.create({
      owner_id: req.user.id,
      name,
      location,
      sport_type,
      price_per_hr,
      images,
      amenities: amenities ? JSON.parse(amenities) : [],
      description,
      contact_phone,
      contact_email
    });

    res.status(201).json({
      success: true,
      message: 'Venue created successfully. Waiting for admin approval.',
      data: { venue }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all venues
// @route   GET /api/venues
// @access  Public
const getVenues = async (req, res, next) => {
  try {
    const {
      sport_type,
      location,
      price_min,
      price_max,
      limit = 20,
      offset = 0,
      approved = true
    } = req.query;

    const filters = {
      sport_type,
      location,
      price_min: price_min ? parseFloat(price_min) : undefined,
      price_max: price_max ? parseFloat(price_max) : undefined,
      limit: parseInt(limit),
      offset: parseInt(offset),
      approved: approved === 'true'
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
};

// @desc    Get venue by ID
// @route   GET /api/venues/:id
// @access  Public
const getVenueById = async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.id);
    
    if (!venue) {
      return res.status(404).json({
        success: false,
        message: 'Venue not found'
      });
    }

    // Get venue statistics
    const stats = await Venue.getStats(req.params.id);

    res.json({
      success: true,
      data: { 
        venue,
        stats
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update venue
// @route   PUT /api/venues/:id
// @access  Private (Owner/Admin)
const updateVenue = async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.id);
    
    if (!venue) {
      return res.status(404).json({
        success: false,
        message: 'Venue not found'
      });
    }

    // Check ownership
    if (venue.owner_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only update your own venues.'
      });
    }

    const {
      name,
      location,
      sport_type,
      price_per_hr,
      description,
      contact_phone,
      contact_email,
      amenities
    } = req.body;

    // Handle image uploads
    let images = venue.images || [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, file.originalname);
        images.push(result.secure_url);
      }
    }

    // Update venue
    const updatedVenue = await Venue.update(req.params.id, {
      name,
      location,
      sport_type,
      price_per_hr,
      images,
      amenities: amenities ? JSON.parse(amenities) : venue.amenities,
      description,
      contact_phone,
      contact_email
    });

    res.json({
      success: true,
      message: 'Venue updated successfully',
      data: { venue: updatedVenue }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete venue
// @route   DELETE /api/venues/:id
// @access  Private (Owner/Admin)
const deleteVenue = async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.id);
    
    if (!venue) {
      return res.status(404).json({
        success: false,
        message: 'Venue not found'
      });
    }

    // Check ownership
    if (venue.owner_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only delete your own venues.'
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
};

// @desc    Get my venues
// @route   GET /api/venues/my-venues
// @access  Private (Partner)
const getMyVenues = async (req, res, next) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    
    const venues = await Venue.findByOwner(
      req.user.id,
      parseInt(limit),
      parseInt(offset)
    );

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
};

// @desc    Search venues
// @route   GET /api/venues/search
// @access  Public
const searchVenues = async (req, res, next) => {
  try {
    const { q, sport_type, location, limit = 20 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const venues = await Venue.search(q, {
      sport_type,
      location,
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      data: { venues }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get venue slots
// @route   GET /api/venues/:id/slots
// @access  Public
const getVenueSlots = async (req, res, next) => {
  try {
    const { date, limit = 50 } = req.query;
    
    const slots = await Slot.findAvailableSlots(
      req.params.id,
      date,
      parseInt(limit)
    );

    res.json({
      success: true,
      data: { slots }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create venue slots
// @route   POST /api/venues/:id/slots
// @access  Private (Owner/Admin)
const createVenueSlots = async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.id);
    
    if (!venue) {
      return res.status(404).json({
        success: false,
        message: 'Venue not found'
      });
    }

    // Check ownership
    if (venue.owner_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only manage your own venues.'
      });
    }

    const { date, start_hour, end_hour, slot_duration = 1 } = req.body;
    
    const slots = await Slot.generateTimeSlots(
      req.params.id,
      date,
      start_hour,
      end_hour,
      slot_duration
    );

    res.status(201).json({
      success: true,
      message: `${slots.length} slots created successfully`,
      data: { slots }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get venue bookings
// @route   GET /api/venues/:id/bookings
// @access  Private (Owner/Admin)
const getVenueBookings = async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.id);
    
    if (!venue) {
      return res.status(404).json({
        success: false,
        message: 'Venue not found'
      });
    }

    // Check ownership
    if (venue.owner_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own venue bookings.'
      });
    }

    const { limit = 20 } = req.query;
    const bookings = await Slot.getUpcomingBookings(req.params.id, parseInt(limit));

    res.json({
      success: true,
      data: { bookings }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
  getMyVenues,
  searchVenues,
  getVenueSlots,
  createVenueSlots,
  getVenueBookings
}; 