const app = require('../app');
const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleValidationErrorDB = (err) => {
  const message = 'Invalid input data';
  return new AppError(message, 400);
};

const handleJWTError = (err) => {
  new AppError(err.message);
};

const sendErrorPro = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('error', err);
    res.status(500).json({
      status: 'error',
      message: 'Somethng went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  console.log(err.statusCode);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.eventNames.NODE_ENV === 'production') {
    let error = { ...err };
    console.log(error);
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError(error);
    }
    sendErrorPro(err, res);
  }
};
