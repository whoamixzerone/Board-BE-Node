const express = require('express');
const morgan = require('morgan');

const app = express();

app.set('port', process.env.PORT || 8080);

// dev(개발용) 로그 기록(HTTP method, path status 등)
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
  console.log('/ connected success');
  res.end('<h1>Hello, Node!</h1>');
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} not found route`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
