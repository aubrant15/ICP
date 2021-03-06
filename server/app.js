// 'use strict';

let express = require('express');

let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let debug = require('debug');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let routes = require('./routes/endpoints');
let config = require('./config');
let app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
debug.log('Environment: ' + process.env.NODE_ENV.toString());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 8080);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function _initializeModels () {
  mongoose.connect(config.localdb);
  mongoose.connection.on('error', function (err) {
    console.log('Mongo connection error', {err: err});
  });
}

_initializeModels();

app.use('/api', routes);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);
debug.log('Listening on port: ' + app.get('port'));
app.listen(app.get('port'));

module.exports = app;
