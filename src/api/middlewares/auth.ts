import * as passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../exceptions/customError';
import User from '../entities/User';

// eslint-disable-next-line import/prefer-default-export
export const isAuthVerify = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error, user: User, info: { status: number; message: string }) => {
      if (err) {
        console.error(err);
        return next(err);
      }

      if (!user) {
        return next(new CustomError(info.status, info.message));
      }

      req.user = { id: user.id, name: user.name };
      return next();
    },
  )(req, res, next);
};
