import * as httpStatus from 'http-status';
import { validate } from 'class-validator';
import CustomError from '../exceptions/customError';
import User from '../entities/User';
import { RequestUser } from '../interfaces/user';
import AppDataSource from '../../config/data-source';

/**
 * @whoamixzerone
 * @param {object} userDto : name, email, password
 * @returns
 */
export const findOrCreateUser = async (userDto: RequestUser): Promise<User | CustomError> => {
  const { name, email, password } = userDto;

  try {
    const user = new User();
    user.email = email;
    user.password = password;
    if (name) {
      user.name = name;
    }

    const errors = await validate(user);
    if (errors.length > 0) {
      if (errors[0].constraints) {
        return new CustomError(httpStatus.BAD_REQUEST, Object.values(errors[0].constraints)[0]);
      }
    }

    const userRepository = await AppDataSource.getRepository(User);
    const exUser = await userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    if (exUser) {
      return new CustomError(httpStatus.CONFLICT, '이미 사용중인 아이디입니다');
    }

    return await user.save();
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

export const findByEmail = async (email: string): Promise<User | CustomError> => {
  try {
    const userRepository = await AppDataSource.getRepository(User);
    const user = await userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    if (!user) {
      return new CustomError(httpStatus.BAD_REQUEST, '아이디 혹은 비밀번호를 확인해주세요');
    }

    return user;
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
