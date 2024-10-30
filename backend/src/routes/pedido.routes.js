import { Router } from "express";
import pedidoController from "../controllers/pedido.controller.js"; 

const router = Router();

router.post("/", pedidoController.create);
router.get("/", pedidoController.getAll);
router.get("/:id", pedidoController.getById);
router.put("/:id", pedidoController.update);
router.delete("/:id", pedidoController.delete);

export default router;
