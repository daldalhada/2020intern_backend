const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const {stream} = require('./logger');
const bodyParser = require('body-parser');
//const logger = require('./logger');
//const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined"; // NOTE: morgan 출력 형태

let envPath = '';
process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';

if (process.env.NODE_ENV === 'development') {
  envPath = '.env.development';
  console.log('develop mode');
} else {
  envPath = '.env.production';
  console.log('production mode');
}

require('dotenv').config({
  path: path.join(__dirname, envPath)
})

const usersRouter = require('./routes/user');
const mainRouter = require('./routes/main');
const matchingRouter = require('./routes/matching');
const notificationRouter = require('./routes/notification');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(morgan(morganFormat, { stream: logger.httpLogStream })); // NOTE: http request 로그 남기기
app.use(morgan('combined', {stream}));

app.use('/user', usersRouter);
app.use('/main', mainRouter);
app.use('/matching', matchingRouter);
app.use('/notification', notificationRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
