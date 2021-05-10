const express = require('express');
const {
  getAllEvents,
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent,
  uploadEventImages,
  resizeEventImages,
  testUpload,
} = require('../controllers/eventController');

const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllEvents)
  .post(
    protect,
    restrictTo('admin'),
    uploadEventImages,
    resizeEventImages,
    createEvent
  );
router
  .route('/:id')
  .get(getEvent)
  .delete(protect, restrictTo('admin'), deleteEvent)
  .patch(
    protect,
    restrictTo('admin'),
    uploadEventImages,
    resizeEventImages,
    updateEvent
  );

module.exports = router;
