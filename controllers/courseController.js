const Course = require('../models/courseModel');
const {
  getAll,
  createOne,
  deleteOne,
  getOne,
  updateOne,
} = require('./handleFactory');

exports.getAllCourses = getAll(Course);
exports.createCourse = createOne(Course);
exports.deleteCourse = deleteOne(Course);
exports.getCourse = getOne(Course);
exports.updateCourse = updateOne(Course);
