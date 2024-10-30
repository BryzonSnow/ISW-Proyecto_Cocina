import { Router } from "express";
import ingredienteController from "../controllers/ingrediente.controller.js";

const router = Router();

router.post("/", ingredienteController.create);
router.get("/", ingredienteController.getAll);
router.get("/:id", ingredienteController.getById);
router.put("/:id", ingredienteController.update);
router.delete("/:id", ingredienteController.delete);

export default router;
