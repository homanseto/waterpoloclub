const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const courseSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'A course must have a type '],
      enum: {
        values: ['children', 'adult', 'training'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    level: {
      type: String,
      required: [true, 'A course must need to level '],
      enum: {
        values: ['beginner', 'intermediate', 'advanced'],
        message: 'Difficulty is either: beginner, intermediate, advanced',
      },
    },
    slug: String,
    location: {
      type: String,
      required: [true, 'A course must have location '],
      trim: true,
      enum: {
        values: ['mei_foo', 'sham_shui_po', 'kowloon_park', 'tai_wo_hau'],
        message: 'the list of location',
      },
    },
    week: {
      type: String,
      required: [true, 'A course must have location '],
      enum: {
        values: [
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
          'sunday',
        ],
        message: 'the course must have a weekday',
      },
    },
    time: {
      type: String,
      required: [true, 'A course must have a time'],
    },
    price: {
      type: Number,
      required: [true, 'A course must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // only for create new doc not for update
          return val < this.price;
        },
        message: 'discount({VALUE}) need to be below the regular price',
      },
    },
    maxGroupSize: {
      type: Number,
      min: [1, 'must at least 1 ppl'],
    },
    // bookings: [{ type: mongoose.Schema.ObjectId, ref: 'Booking' }],
    startDates: [Date],
    coaches: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// function timeconvert(hour, min) {
//   if (hour <= 9) {
//     hour = `0${hour}`;
//   }
//   if (min <= 9) {
//     min = `0${min}`;
//   }
//   return `${hour}:${min}`;
// }

// courseSchema.virtual('time').get(function () {
//   const hour = this.startDates[0].getUTCHours();
//   const min = this.startDates[0].getUTCMinutes();
//   return timeconvert(hour, min);
// });

courseSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'course',
});

// document middleware: runs before the .save() and .create(), this keyword pointing to current document
courseSchema.pre('save', function (next) {
  this.slug = slugify(`${this.courseType}&${this.courseLevel}`, {
    lower: true,
  });
  next();
});
courseSchema.pre(/^find/, function (next) {
  this.populate({ path: 'coaches', select: '-__v' }).populate({
    path: 'bookings',
  });
  next();
});

const Course = mongoose.model('Course', courseSchema);

courseSchema.index({ coursePrice: -1 });

module.exports = Course;
