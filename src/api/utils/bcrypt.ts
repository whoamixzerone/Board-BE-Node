import * as bcrypt from 'bcrypt';
import * as httpStatus from 'http-status';
import User from '../entities/User';
import CustomError from '../exceptions/customError';

// export const passwordToHash = async (password: string) => {
//   try {
//     return await bcrypt.hash(password, 12);
//   } catch (err) {
//     console.error(err);
//   }
// };

// eslint-disable-next-line import/prefer-default-export
export const isComparePassword = async (user: User, password: string): Promise<boolean | Error> => {
  try {
    return await bcrypt.compare(password, user.password);
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
