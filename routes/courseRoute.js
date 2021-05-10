const express = require('express');
const {
  getAllCourses,
  createCourse,
  deleteCourse,
  getCourse,
  updateCourse,
} = require('../controllers/courseController');

const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllCourses)
  .post(protect, restrictTo('admin'), createCourse);

router
  .route('/:id')
  .get(getCourse)
  .delete(protect, restrictTo('admin'), deleteCourse)
  .patch(updateCourse);

module.exports = router;
