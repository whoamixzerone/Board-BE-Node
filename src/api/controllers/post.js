const postService = require('../services/post');

const createPost = async (req, res, next) => {
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

const updatePost = async (req, res, next) => {
  const postDto = {
    id: Number(req.params.id),
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

const deletePost = async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const result = await postService.destroy(id);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(200).end();
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const restorePost = async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const result = await postService.restore(id);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(200).end();
  } catch (err) {
    console.error(err);
    return next(error);
  }
};

const getPost = async (req, res, next) => {
  const id = Number(req.params.id);

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

const getPostList = async (req, res, next) => {
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

module.exports = {
  createPost,
  updatePost,
  deletePost,
  restorePost,
  getPost,
  getPostList,
};
