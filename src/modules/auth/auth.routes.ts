import { Router } from 'express';
import { postSignIn, postSignUp } from './auth.controller';

const router = Router();

router.post('/signup', postSignUp);
router.post('/signin', postSignIn);

export default router;
