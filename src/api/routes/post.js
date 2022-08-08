const express = require('express');

const postController = require('../controllers/post');

const router = express.Router();

router.post('/', postController.createPost);
router.patch('/:id', postController.updatePost);
//router.get('/', postController.getPostList);

// router.delete('/:id', (req, res, next) => {
//   const _id = parseInt(req.params.id);
//   const datas = JSON.parse(req.posts);
//   const isData = datas.filter((v) => v.id === _id);
//   if (isData.length == 0) return res.status(404).end();

//   const data = datas.filter((v) => v.id !== _id);
//   addWriteData(data);
//   res.status(302);
//   res.redirect('/posts');
// });

// router.get('/:id', (req, res, next) => {
//   const _id = parseInt(req.params.id);
//   const datas = JSON.parse(req.posts);
//   const data = datas.filter((v) => v.id === _id);
//   if (data.length == 0) return res.status(404).end();

//   res.status(200).json(data);
// });

module.exports = router;
