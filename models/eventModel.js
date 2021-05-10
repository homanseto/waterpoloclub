const mongoose = require('mongoose');

const eventScheme = new mongoose.Schema({
  date: {
    type: Date,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [10, 'A title name must have more or equal then 10 characters'],
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: [10, 'A content must have more or equal then 10 characters'],
    maxlength: [200, 'A content must have less or equal then 200 characters'],
  },
  files: {
    type: [String],
    required: true,
  },
  images: {
    type: [String],
  },
});

const Event = mongoose.model('Event', eventScheme);

module.exports = Event;
