import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
// import * as passport from 'passport';
import { NextFunction, Request, Response } from 'express';

import routes from '../api/routes';
// import passportConfig from '../api/middlewares/jwtStrategy';
import CustomError from '../api/exceptions/customError';

const app = express();

// dev(개발용) 로그 기록(HTTP method, path status 등)
app.use(morgan('dev'));
app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(passport.initialize());
// passportConfig();

app.use('/api', routes);

app.use((req, _res, next) => {
  const error = new CustomError(404, `${req.method} ${req.url} not found router`);
  next(error);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.json({ code: err.status, message: err.message });
});

export default app;
