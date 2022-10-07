import * as express from 'express';
import { createComment, getCommentList } from '../controllers/comment';
import {
  createPost,
  deletePost,
  getPost,
  getPostList,
  restorePost,
  updatePost,
} from '../controllers/post';
import { isAuthorityPost } from '../middlewares/auth';

const router = express.Router();

router.post('/', createPost);
router.patch('/:id', isAuthorityPost, updatePost);
router.delete('/:id', isAuthorityPost, deletePost);
router.patch('/:id/restore', isAuthorityPost, restorePost);
router.get('/:id', getPost);
router.get('/', getPostList);
router.post('/:id/comments', createComment);
router.get('/:id/comments', getCommentList);

export default router;
