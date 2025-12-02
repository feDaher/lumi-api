import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
const controller = new AuthController();

router.post('/signin', controller.postSignIn);
router.post('/signup', controller.postSignUp);
router.post('/validade', (req, res) => controller.postValidate(req, res));
router.post('/logout', (req, res) => controller.postLogout(req, res));

export default router;
