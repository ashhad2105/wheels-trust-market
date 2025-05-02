const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  updateBookingStatus
} = require('../controllers/bookingController');
const { validateBooking, validateBookingStatus, handleValidationErrors } = require('../middleware/validate');

// @route   GET /api/v1/bookings
// @desc    Get all bookings
// @access  Private
router.get('/', protect, getBookings);

// @route   GET /api/v1/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', protect, getBooking);

// @route   POST /api/v1/bookings
// @desc    Create new booking
// @access  Private
router.post('/', protect, validateBooking, handleValidationErrors, createBooking);

// @route   PUT /api/v1/bookings/:id
// @desc    Update booking
// @access  Private
router.put('/:id', protect, validateBooking, handleValidationErrors, updateBooking);

// @route   DELETE /api/v1/bookings/:id
// @desc    Delete booking
// @access  Private
router.delete('/:id', protect, deleteBooking);

// @route   PATCH /api/v1/bookings/:id/status
// @desc    Update booking status
// @access  Private
router.patch('/:id/status', protect, validateBookingStatus, handleValidationErrors, updateBookingStatus);

module.exports = router; 