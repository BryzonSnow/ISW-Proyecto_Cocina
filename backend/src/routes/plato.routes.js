import { Router } from "express";
import platoController from "../controllers/plato.controller.js"; 

const router = Router();

router.post("/", platoController.create);
router.get("/", platoController.getAll);
router.get("/:id", platoController.getById);
router.put("/:id", platoController.update);
router.delete("/:id", platoController.delete);

export default router;
