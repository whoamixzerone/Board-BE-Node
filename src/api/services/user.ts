import * as httpStatus from 'http-status';
import CustomError from '../exceptions/customError';
import User from '../entities/User';

export const findOrCreateUser = async (userDto: User) => {
  const { name, email, password } = userDto;

  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, email, password },
    });
    if (!created) {
      return new CustomError(httpStatus.CONFLICT, '이미 사용중인 아이디입니다');
    }

    return user;
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

export const findByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return new CustomError(httpStatus.BAD_REQUEST, '아이디 혹은 비밀번호를 확인해주세요');
    }

    return user;
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
