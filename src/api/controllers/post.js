const path = require('path');
const fs = require('fs').promises;
const postService = require('../services/post');

// const addWriteData = async (data) => {
//   await fs.writeFile(
//     path.join(__dirname, '../simple-data.json'),
//     JSON.stringify(data),
//     'utf8',
//   );
// };

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

const addPostList = async (req, res, next) => {
  try {
    const result = await postService.create(req.body);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  addPostList,
  getPostList,
  // addWriteData,
};
