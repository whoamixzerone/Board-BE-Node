import { Request, Response, NextFunction } from 'express';
import * as httpStatus from 'http-status';
import User from '../entities/User';
import CustomError from '../exceptions/customError';
import { AccessToken } from '../interfaces/token';
import { RequestUser } from '../interfaces/user';
import * as userService from '../services/user';
import * as bcryptUtils from '../utils/bcrypt';
import generateAuthToken from '../utils/token';

export const signup = async (
  req: Request<any, any, { email: string; name: string; password: string }, any>,
  res: Response,
  next: NextFunction,
) => {
  const userDto: RequestUser = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  };

  try {
    const user = await userService.findOrCreateUser(userDto);
    if (user instanceof Error) {
      return next(user);
    }

    return res.status(httpStatus.CREATED).end();
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const signin = async (
  req: Request<any, any, { email: string; password: string }, any>,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findByEmail(email);
    if (user instanceof Error) {
      return next(user);
    }

    if (!(await bcryptUtils.isComparePassword(user, password))) {
      return next(new CustomError(httpStatus.BAD_REQUEST, '아이디 혹은 비밀번호를 확인해주세요'));
    }

    const token: AccessToken | Error = await generateAuthToken(user);
    if (token instanceof Error) {
      return next(token);
    }

    return res.status(httpStatus.OK).json(token);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const reissue = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  try {
    const user = await userService.findByEmail(email);
    const token = await generateAuthToken(user as User);
    if (token instanceof Error) {
      return next(token);
    }

    return res.status(httpStatus.OK).json(token);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
