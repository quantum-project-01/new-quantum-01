const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
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
} = require('../controllers/venueController');

const { authenticate, authorize, optionalAuth } = require('../middleware/auth');
const {
  validateVenueCreation,
  validateSlotCreation,
  validateId,
  validatePagination,
  handleValidationErrors
} = require('../middleware/validation');

const { body } = require('express-validator');

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10 // Maximum 10 files
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Public routes
router.get('/', validatePagination, getVenues);
router.get('/search', [
  body('q').optional().trim().isLength({ min: 1 }),
  handleValidationErrors
], searchVenues);
router.get('/:id', validateId, getVenueById);
router.get('/:id/slots', validateId, getVenueSlots);

// Protected routes
router.use(authenticate);

// Partner/Admin routes
router.post('/', 
  authorize('partner', 'admin'),
  upload.array('images', 10),
  validateVenueCreation,
  createVenue
);

router.get('/my/venues', 
  authorize('partner', 'admin'),
  validatePagination,
  getMyVenues
);

router.put('/:id',
  validateId,
  upload.array('images', 10),
  updateVenue
);

router.delete('/:id',
  validateId,
  deleteVenue
);

// Slot management routes
router.post('/:id/slots',
  validateId,
  [
    body('date').isISO8601().toDate().withMessage('Valid date is required'),
    body('start_hour').isInt({ min: 0, max: 23 }).withMessage('Start hour must be between 0 and 23'),
    body('end_hour').isInt({ min: 1, max: 24 }).withMessage('End hour must be between 1 and 24'),
    body('slot_duration').optional().isInt({ min: 1, max: 12 }).withMessage('Slot duration must be between 1 and 12 hours'),
    handleValidationErrors
  ],
  createVenueSlots
);

router.get('/:id/bookings',
  validateId,
  getVenueBookings
);

module.exports = router; 