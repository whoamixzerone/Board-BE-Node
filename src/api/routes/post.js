const express = require('express');

const postController = require('../controllers/post');

const router = express.Router();

router.post('/', postController.createPost);
router.patch('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/:id/restore', postController.restorePost);
router.get('/:id', postController.getPost);
router.get('/', postController.getPostList);

module.exports = router;
