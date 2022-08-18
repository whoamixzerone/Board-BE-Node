const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('../api/middlewares/jwtStrategy');

const routes = require('../api/routes');

const app = express();

// dev(개발용) 로그 기록(HTTP method, path status 등)
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname + 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
passportConfig();

app.use('/api', routes);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} not found route`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.json({ statusCode: err.status, message: err.message });
});

module.exports = app;
