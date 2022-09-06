import * as express from 'express';
import authRoutes from './auth';
import postRoutes from './post';
import { isAuthVerify } from '../middlewares/auth';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/posts', isAuthVerify, postRoutes);

export default router;
