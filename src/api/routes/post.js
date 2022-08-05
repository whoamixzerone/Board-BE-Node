const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const { getPostList, addWriteData } = require('../controllers/post');

const postController = require('../controllers/post');

const router = express.Router();

// router.use(async (req, res, next) => {
//   try {
//     const posts = await fs.readFile(
//       path.join(__dirname, '../simple-data.json'),
//       'utf8',
//     );
//     req.posts = posts;
//     next();
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

router.get('/', postController.getPostList);
router.post('/', postController.addPostList);

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

router.delete('/:id', (req, res, next) => {
  const _id = parseInt(req.params.id);
  const datas = JSON.parse(req.posts);
  const isData = datas.filter((v) => v.id === _id);
  if (isData.length == 0) return res.status(404).end();

  const data = datas.filter((v) => v.id !== _id);
  addWriteData(data);
  res.status(302);
  res.redirect('/posts');
});

router.get('/:id', (req, res, next) => {
  const _id = parseInt(req.params.id);
  const datas = JSON.parse(req.posts);
  const data = datas.filter((v) => v.id === _id);
  if (data.length == 0) return res.status(404).end();

  res.status(200).json(data);
});

module.exports = router;
