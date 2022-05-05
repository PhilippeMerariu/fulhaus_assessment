var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const mongoose = require('mongoose');

// // database setup
async function setup_db(){
  await mongoose.connect('mongodb://localhost:27017/fulhaus');

  const acronymSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    acronym: String,
    definition: String
  });

  const Acronyms = mongoose.model('Acronyms', acronymSchema);

  const tobe = new Acronyms({ acronym: '2B', definition: 'to be' });
  const tooeasy = new Acronyms({ acronym: '2EZ', definition: 'too easy' });
  const toogoodtobetrue = new Acronyms({ acronym: '2G2BT', definition: 'too good to be true' });
}
setup_db().catch(err => console.log(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
