import { Router } from 'express';
import { AuthController} from './auth.controller';

const router = Router();
const controller = new AuthController();

router.post('/signup', (req, res) => controller.postSignUp(req, res));
router.post('/signin', (req, res) => controller.postSignIn(req, res));
router.post('/validade', (req, res) => controller.postValidate(req, res));
router.post('/logout', (req, res) => controller.postLogout(req, res));

export default router;
