'use strict';

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// Basis of the SPA
const home = require('./routes/index');

exports default const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '{views}');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Set home page
app.use('/', home);

app.use((req, res, next) => {
  let err = new err('Not found');
  err.status = 404;
  next(err);
});

// err handlers

// development err handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use( (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      err: err
    });
  });
}

// production err handler
// no stacktraces leaked to the user
app.use( (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
