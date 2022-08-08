const postService = require('../services/post');

const getPostList = async (req, res, next) => {
  try {
    // MySQL 문법
    const query = 'SELECT * FROM posts';
    const posts = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    // sequelize 문법
    // const posts = await Post.findAll();

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const createPost = async (req, res, next) => {
  // todo : 임시 데이터
  req.user = {
    userId: 1,
    name: '홍길동',
  };
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
  // todo : 임시 데이터
  req.user = {
    userId: 1,
    name: '홍길동',
  };
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

module.exports = {
  createPost,
  updatePost,
  getPostList,
};
