// all the express configuration in here
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const courseRouter = require('./routes/courseRoute');
const eventRouter = require('./routes/eventRoute');
const userRouter = require('./routes/userRoute');
const bookingRouter = require('./routes/bookingRoute');

const app = express();

//1) global middleware
// implement cors only for simply request
app.use(cors());
// access-controll-allow-origin

app.options('*', cors());

app.use(helmet());

//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limit requests from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// data sanitization against noSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    whitelist: ['level'],
  })
);

// serving static files
app.use(express.static(`${__dirname}/public`));
// compression
app.use(compression());
//test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3) Route
app.use('/api/courses', courseRouter);
app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);
app.use('/api/bookings', bookingRouter);

app.all('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
