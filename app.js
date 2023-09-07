const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();
// 1)MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // console.log('wow');
  // req.headers
  // console.log(req.headers);
  next();
});
// !ROUTE HANDLERS

// ROUTE

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// app.all('*', (req, res, next) => {
//   // console.log(e);
//   res.status(404).json({
//     status: 'fail',
//     message: `Can't find ${req.originalUrl} on this server`,
//   });
// });

app.all('*', (req, res, next) => {
  // console.log(er);
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
