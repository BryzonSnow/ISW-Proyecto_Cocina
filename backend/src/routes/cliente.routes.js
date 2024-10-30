import { Router } from "express";
import { createCliente, deleteCliente, getCliente, getClientes, updateCliente } from "../controllers/cliente.controller.js";

const router = Router();

router.post("/", createCliente);
router.get("/all", getClientes);
router.get("/:id", getCliente);
router.delete("/:id", deleteCliente);
router.put("/:id", updateCliente);

export default router;