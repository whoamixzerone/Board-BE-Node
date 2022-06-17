const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const {
  getPostList,
  addPostList,
  addWriteData,
} = require('../controllers/post');

const router = express.Router();

router.use(async (req, res, next) => {
  try {
    const posts = await fs.readFile(
      path.join(__dirname, '../simple-data.json'),
      'utf8'
    );
    req.posts = posts;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/', getPostList);
router.post('/', addPostList);

router.patch('/:id', (req, res, next) => {
  const _id = parseInt(req.params.id);
  const datas = JSON.parse(req.posts);
  const data = [];
  const isData = datas.filter((v) => v.id === _id);
  if (isData.length == 0) return res.status(404).end();

  datas.forEach((v) => {
    if (v.id === _id) {
      v.title = req.body.title;
      v.content = req.body.content;

      addWriteData([v]);
    }
  });

  res.status(302);
  res.redirect('/posts');
});

module.exports = router;
