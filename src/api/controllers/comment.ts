import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status';
import Post from '../entities/Post';
import User from '../entities/User';
import { RequestIdAndComment } from '../interfaces/comment';
import * as commentService from '../services/comment';

const createComment = async (
  req: Request<{ id: number }, unknown, { content: string }, unknown>,
  res: Response,
  next: NextFunction,
) => {
  const commentDto: RequestIdAndComment = {
    content: req.body.content,
    post: req.params.id as unknown as Pick<Post, 'id'>,
    user: req.user as Pick<User, 'id' | 'name'>,
  };

  try {
    const result = await commentService.create(commentDto);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(httpStatus.CREATED).json({ id: result.id });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const getCommentList = async (
  req: Request<{ id: number }, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await commentService.getList(req.params.id);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export { createComment, getCommentList };
