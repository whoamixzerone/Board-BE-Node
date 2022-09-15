import { Request, Response, NextFunction } from 'express';
import User from '../entities/User';
import { PostIdAndUser, RequestIdAndPost, RequestPost } from '../interfaces/post';
import * as postService from '../services/post';

export const createPost = async (
  req: Request<any, any, { title: string; content: string }, any>,
  res: Response,
  next: NextFunction,
) => {
  const postDto: RequestPost = {
    title: req.body.title,
    content: req.body.content,
    user: req.user as User,
  };
  try {
    const result = await postService.create(postDto);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(201).json({ id: result.id });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const updatePost = async (
  req: Request<{ id: number }, any, { title: string; content: string }, any>,
  res: Response,
  next: NextFunction,
) => {
  const postDto: RequestIdAndPost = {
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  };
  try {
    const result = await postService.update(postDto);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const deletePost = async (
  req: Request<{ id: number }, any, any, any>,
  res: Response,
  next: NextFunction,
) => {
  const postDto: PostIdAndUser = {
    id: req.params.id,
    user: req.user as User,
  };

  try {
    const result = await postService.destroy(postDto);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(200).end();
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const restorePost = async (
  req: Request<{ id: number }, any, any, any>,
  res: Response,
  next: NextFunction,
) => {
  const postDto: PostIdAndUser = {
    id: req.params.id,
    user: req.user as User,
  };

  try {
    const result = await postService.restore(postDto);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(200).end();
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const getPost = async (
  req: Request<{ id: number }, any, any, any>,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;

  try {
    const result = await postService.updateAndFindId(id);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const getPostList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await postService.getList();
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
