import * as jwt from 'jsonwebtoken';
import User from '../entities/User';
import { AccessToken } from '../interfaces/token';

const generateAuthToken = async (user: User): Promise<AccessToken | Error> => {
  const { id, name } = user;

  try {
    const token = await jwt.sign(
      { userId: id, userName: name },
      process.env.AUTH_ACCESSKEY_TOKEN as string,
      {
        algorithm: process.env.AUTH_ALGORITHM_TOKEN,
        expiresIn: process.env.AUTH_EXPIRESIN_TOKEN,
      } as jwt.SignOptions,
    );

    const accessToken: AccessToken = {
      accessToken: token,
    };
    return accessToken;
  } catch (err: any) {
    console.error(err);
    return new Error(err);
  }
};

export default generateAuthToken;
