const express = require('express');
const {
  getCheckoutSession,
  newBookings,
  getAllBookings,
  deleteBooking,
  getUserBookedCourses,
  paidBooking,
} = require('../controllers/bookingController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.route('/').get(getAllBookings).post(protect, newBookings);

router.route('/:id').delete(protect, deleteBooking);

router.get('/bookedCourses', protect, getUserBookedCourses);

router.post('/checkout-session', protect, getCheckoutSession);

router.patch('/paid', protect, paidBooking);

module.exports = router;
