const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.ObjectId,
      ref: 'Course',
      required: [true, 'Booking must belong to a Course'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a User'],
    },
    price: {
      type: Number,
      require: [true, 'Booking must have a price'],
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookingSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user' });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
