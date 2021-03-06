const APIfeatures = require('../utils/apifeature');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAll = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let features = new APIfeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = popOptions
      ? await features.query.populate(popOptions)
      : await features.query;
    // send response
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      // fail return immediately
      return next(new AppError('cannot find it', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      // fail return immediately
      return next(new AppError('cannot find it', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      // fail return immediately
      return next(new AppError('cannot find it', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });
