import * as passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../exceptions/customError';
import User from '../entities/User';
import * as httpStatus from 'http-status';
import AppDataSource from '../../config/data-source';
import Post from '../entities/Post';

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

export const isAuthorityPost = async (
  req: Request<{ id: number }, any, any, any>,
  res: Response,
  next: NextFunction,
) => {
  const postId = req.params.id;
  const user = req.user;

  try {
    const postRepository = await AppDataSource.getRepository(Post);
    const post = await postRepository
      .createQueryBuilder('post')
      .select(['post.id', 'user.id'])
      .innerJoin('post.user', 'user')
      .where('post.id = :postId', { postId })
      .getOne();
    if (!post) {
      return next(new CustomError(httpStatus.NOT_FOUND, '해당 게시물을 찾을 수 없습니다'));
    }

    if (user?.id !== post.user.id) {
      return next(new CustomError(httpStatus.FORBIDDEN, '해당 게시물의 작성자가 아닙니다'));
    }

    return next();
  } catch (err) {
    console.error(err);
    return next(new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err as string));
  }
};
