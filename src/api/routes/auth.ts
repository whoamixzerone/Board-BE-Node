import * as express from 'express';
import { reissue, signin, signup } from '../controllers/auth';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/reissuance', reissue);

export default router;
