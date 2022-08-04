const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs').promises;

const { User, Post, sequelize } = require('../models');

exports.addWriteData = async (data) => {
  await fs.writeFile(
    path.join(__dirname, '../simple-data.json'),
    JSON.stringify(data),
    'utf8',
  );
};

exports.getPostList = async (req, res, next) => {
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

exports.addPostList = async (req, res, next) => {
  try {
    const postList = JSON.parse(req.posts);
    const data = {
      id: postList.length + 1,
      title: req.body.title,
      content: req.body.content,
      registerId: 'xxx',
      hits: 0,
      registerDate: '2022-06-17',
    };
    postList.push(data);

    this.addWriteData(postList);

    res.redirect('/posts');
  } catch (err) {
    console.error(err);
    next(err);
  }
};
