import { Router } from "express";
import { getInventarios, getInventarioById, createInventario, updateInventario, deleteInventario } from "../controllers/inventario.controller";

const router = Router();

router.get("/inventarios", getInventarios);
router.get("/inventarios/:id", getInventarioById);
router.post("/inventarios", createInventario);
router.put("/inventarios/:id", updateInventario);
router.delete("/inventarios/:id", deleteInventario);

export default router;