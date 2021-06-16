const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const vhost = require('vhost');
const favicon = require('serve-favicon');
require("dotenv").config();

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000 // 1 hour
  }
}))

app.use(logger('common'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'shrimp.ico')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3131');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Credentials', 'true')
  next();
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.stack);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(vhost("kshrimp.kro.kr", app));

module.exports = app;
