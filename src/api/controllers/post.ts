import { Request, Response, NextFunction } from 'express';
import postService from '../services/post';

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const postDto = {
    ...req.body,
    ...req.user,
  };
  try {
    const result = await postService.create(postDto);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const updatePost = async (
  req: Request<{ id: number }, any, any, any>,
  res: Response,
  next: NextFunction,
) => {
  const postDto = {
    id: req.params.id,
    ...req.body,
    ...req.user,
  };
  try {
    const result = await postService.update(postDto);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(200).end();
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
  const postDto = {
    id: req.params.id,
    ...req.user,
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
  const postDto = {
    id: req.params.id,
    ...req.user,
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
  const { id } = req.params;

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
