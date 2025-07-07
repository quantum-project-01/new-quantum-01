const { body, param, query, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  
  next();
};

// User validation rules
const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('role')
    .optional()
    .isIn(['user', 'partner', 'admin'])
    .withMessage('Role must be user, partner, or admin'),
  handleValidationErrors
];

const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Venue validation rules
const validateVenueCreation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Venue name must be between 2 and 100 characters'),
  body('location')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Location must be between 5 and 200 characters'),
  body('sport_type')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Sport type must be between 2 and 50 characters'),
  body('price_per_hr')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Price per hour must be a positive number'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('contact_phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('contact_email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('amenities')
    .optional()
    .isArray()
    .withMessage('Amenities must be an array'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
  handleValidationErrors
];

// Slot validation rules
const validateSlotCreation = [
  body('venue_id')
    .isInt({ min: 1 })
    .withMessage('Valid venue ID is required'),
  body('date')
    .isISO8601()
    .toDate()
    .withMessage('Valid date is required (YYYY-MM-DD)'),
  body('start_time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM:SS format'),
  body('end_time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage('End time must be in HH:MM:SS format'),
  handleValidationErrors
];

// Booking validation rules
const validateBookingCreation = [
  body('slot_id')
    .isInt({ min: 1 })
    .withMessage('Valid slot ID is required'),
  body('amount_paid')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Amount paid must be a positive number'),
  handleValidationErrors
];

// Parameter validation
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid ID is required'),
  handleValidationErrors
];

// Query validation
const validatePagination = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a non-negative number'),
  handleValidationErrors
];

const validateDateRange = [
  query('date_from')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Valid start date is required (YYYY-MM-DD)'),
  query('date_to')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Valid end date is required (YYYY-MM-DD)'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateUserLogin,
  validateVenueCreation,
  validateSlotCreation,
  validateBookingCreation,
  validateId,
  validatePagination,
  validateDateRange
}; 