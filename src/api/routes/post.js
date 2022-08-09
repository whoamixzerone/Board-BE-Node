const express = require('express');

const postController = require('../controllers/post');

const router = express.Router();

router.post('/', postController.createPost);
router.patch('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/:id/restore', postController.restorePost);
//router.get('/', postController.getPostList);

// router.get('/:id', (req, res, next) => {
//   const _id = parseInt(req.params.id);
//   const datas = JSON.parse(req.posts);
//   const data = datas.filter((v) => v.id === _id);
//   if (data.length == 0) return res.status(404).end();

//   res.status(200).json(data);
// });

module.exports = router;
