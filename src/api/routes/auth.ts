import * as express from 'express';
import authController from '../controllers/auth';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/reissuance', authController.reissue);

export default router;
