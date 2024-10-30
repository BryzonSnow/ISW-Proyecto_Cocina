import { Router } from "express";
import clienteController from "../controllers/cliente.controller.js";

const router = Router();

router.post("/", clienteController.create);
router.get("/", clienteController.getAll);
router.get("/:id", clienteController.getById);
router.put("/:id", clienteController.update);
router.delete("/:id", clienteController.delete);

export default router;
