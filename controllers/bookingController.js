const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Course = require('../models/courseModel');
const { getAll, createOne, deleteOne, updateOne } = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Booking = require('../models/bookingModel');

exports.getAllBookings = getAll(Booking);
exports.deleteBooking = deleteOne(Booking);

exports.paidBooking = catchAsync(async (req, res, next) => {
  const userId = await req.user.id;
  await Booking.updateMany({ user: userId }, { paid: true });
  const userBooked = await Booking.find({ user: userId });
  res.status(200).json({
    status: 'success',
    results: userBooked.length,
    paidbookings: userBooked,
  });
});

exports.getUserBookedCourses = catchAsync(async (req, res, next) => {
  const userId = await req.user.id;
  const userBooked = await Booking.find({ user: userId }).populate('course');
  const paidUserBooked = await Booking.find({
    user: userId,
    paid: false,
  }).populate('course');
  const totalPrice = paidUserBooked.reduce((acc, cur, i, arr) => {
    return acc + cur.price;
  }, 0);

  res.status(200).json({
    status: 'success',
    results: userBooked.length,
    bookings: userBooked,
    price: totalPrice,
  });
});

exports.newBookings = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.body.courseId);
  const courseId = await course.id;
  const coursePrice = await course.price;
  const userId = await req.user.id;
  const booking = await Booking.create({
    course: courseId,
    user: userId,
    price: coursePrice,
  });
  res.status(201).json({
    status: 'success',
    booking,
  });
});

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const userId = await req.user.id;
  const userBooked = await Booking.find({ user: userId }).populate('course');
  const totalPrice = userBooked.reduce((acc, cur, i, arr) => {
    return acc + cur.price;
  }, 0);
  //create cheakout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: req.user.email,
    client_reference_id: req.user.id,
    line_items: [
      {
        name: 'total booked courses',
        amount: totalPrice * 100,
        currency: 'HKD',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://127.0.0.1:3000/`,
    cancel_url: `http://127.0.0.1:3000/`,
  });
  // session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});
