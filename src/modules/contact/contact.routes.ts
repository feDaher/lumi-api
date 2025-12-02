import { Router } from "express";
import { ContactController } from "./contact.controller";
import { ensureAuth } from "../../middlewares/auth";

const router = Router();

router.use(ensureAuth);

router.get("/", ContactController.getAll);
router.get("/search", ContactController.search);
router.get("/:id", ContactController.getById);
router.post("/", ContactController.create);
router.put("/:id", ContactController.update);
router.delete("/:id", ContactController.delete);

export default router;
