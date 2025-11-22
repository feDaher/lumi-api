import { Router } from "express"; 
import { ContactController } from "./contact.controller";

const router = Router();

router.get("/", ContactController.read);

router.post("/", ContactController.create);

router.put("/:id", ContactController.update);

router.delete("/:id", ContactController.delete);

export default router;
