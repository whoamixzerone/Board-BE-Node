import * as bcrypt from 'bcrypt';
import * as httpStatus from 'http-status';
import User from '../entities/User';
import CustomError from '../exceptions/customError';

export const isComparePassword = async (
  user: User,
  password: string,
): Promise<boolean | CustomError> => {
  try {
    return await bcrypt.compare(password, user.password);
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
