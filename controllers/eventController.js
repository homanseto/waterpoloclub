const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../utils/appError');
const Event = require('../models/eventModel');
const {
  getAll,
  createOne,
  deleteOne,
  getOne,
  updateOne,
} = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
});

exports.uploadEventImages = upload.array('files', 10);

exports.resizeEventImages = catchAsync(async (req, res, next) => {
  req.body.images = [];
  await Promise.all(
    req.files.map(async (file, i) => {
      const filename = `${req.body.date}-${i + 1}.jpeg`;
      await sharp(file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/events/${filename}`);
      req.body.images.push(filename);
    })
  );
  next();
});

exports.getAllEvents = getAll(Event);
exports.createEvent = createOne(Event);
exports.deleteEvent = deleteOne(Event);
exports.getEvent = getOne(Event);
exports.updateEvent = updateOne(Event);
