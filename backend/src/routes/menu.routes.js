import { Router } from "express";
import menuController from "../controllers/menu.controller.js";

const router = Router();

router.post("/", menuController.create);
router.get("/", menuController.getAll);
router.get("/:id", menuController.getById);
router.put("/:id", menuController.update);
router.delete("/:id", menuController.delete);

export default router;
