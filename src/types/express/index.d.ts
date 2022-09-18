import User from '../../api/entities/User';

declare module 'express-serve-static-core' {
  interface Request {
    user?: Partial<User>;
  }
}
