import { Router } from "express";
import inventarioController from "../controllers/inventario.controller.js";

const router = Router();

router.post("/", inventarioController.create);
router.get("/", inventarioController.getAll);
router.get("/:id", inventarioController.getById);
router.put("/:id", inventarioController.update);
router.delete("/:id", inventarioController.delete);

export default router;
