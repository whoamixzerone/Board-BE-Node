import { Request, Response, NextFunction } from 'express';
import * as httpStatus from 'http-status';
import CustomError from '../exceptions/customError';
import userService from '../services/user';
import bcryptUtils from '../utils/bcrypt';
import tokenUtils from '../utils/token';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const userDto = {
    ...req.body,
  };

  try {
    // const hashPasswd = await bcryptUtils.passwordToHash(userDto.password);
    // userDto.password = hashPasswd;

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

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findByEmail(email);
    if (!(await bcryptUtils.isComparePassword(user, password))) {
      return next(new CustomError(httpStatus.BAD_REQUEST, '아이디 혹은 비밀번호를 확인해주세요'));
    }

    const token = await tokenUtils.generateAuthToken(user);
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
    const token = await tokenUtils.generateAuthToken(user);
    if (token instanceof Error) {
      return next(token);
    }

    return res.status(httpStatus.OK).json(token);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
