var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var massive = require('massive');

var app = module.exports = express();

// database setup
var connectionString = "postgres://localhost/extreme_video_express";
var db = massive.connectSync({connectionString: connectionString});
app.set('db', db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
// routes
//

// var routes    = require('./routes/index');
var customers = require('./routes/customers');
var videos    = require('./routes/videos');
var rentals   = require('./routes/rentals');
var index = require('./routes/index')
// app.use('/', routes);
app.use('/customers', customers);
app.use('/videos', videos);
app.use('/rentals', rentals);
app.use('/', index)

//
// error handlers
//

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
