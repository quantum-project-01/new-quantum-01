const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/auth');
const {
  validateId,
  validatePagination,
  handleValidationErrors
} = require('../middleware/validation');

// All routes require authentication
router.use(authenticate);

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Private (Own profile or Admin)
router.get('/:id', validateId, async (req, res, next) => {
  try {
    // Check if user can access this profile
    if (req.params.id !== req.user.id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin only)
router.get('/', 
  authorize('admin'),
  validatePagination,
  async (req, res, next) => {
    try {
      const { limit = 50, offset = 0 } = req.query;
      
      const users = await User.findAll(parseInt(limit), parseInt(offset));

      res.json({
        success: true,
        data: { users },
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          total: users.length
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Private (Admin only)
router.put('/:id/role',
  authorize('admin'),
  [
    validateId[0], // Get the param validation
    require('express-validator').body('role')
      .isIn(['user', 'partner', 'admin'])
      .withMessage('Role must be user, partner, or admin'),
    handleValidationErrors
  ],
  async (req, res, next) => {
    try {
      const { role } = req.body;
      
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const updatedUser = await User.updateRole(req.params.id, role);

      res.json({
        success: true,
        message: 'User role updated successfully',
        data: { user: updatedUser }
      });
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
router.delete('/:id',
  authorize('admin'),
  validateId,
  async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      await User.delete(req.params.id);

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router; 