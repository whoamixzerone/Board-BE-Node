import * as express from 'express';
import {
  createPost,
  deletePost,
  getPost,
  getPostList,
  restorePost,
  updatePost,
} from '../controllers/post';

const router = express.Router();

router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/restore', restorePost);
router.get('/:id', getPost);
router.get('/', getPostList);

export default router;
