import { Router } from "express";
import { ensureAuth } from "../../middlewares/auth";
import { AddressController } from "./address.controller";

const router = Router();

router.use(ensureAuth);

router.get("/me", AddressController.getMe);
router.get("/", AddressController.list);
router.post("/", AddressController.create);
router.put("/:id", AddressController.update);

export default router;
