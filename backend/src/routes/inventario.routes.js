import { Router } from "express";
import { createInventario, deleteInventario, getInventario, getInventarios, updateInventario } from "../controllers/inventario.controller.js";

const router = Router();

router.post("/", createInventario);       
router.get("/all", getInventarios);       
router.get("/:id", getInventario);        
router.delete("/:id", deleteInventario);  
router.put("/:id", updateInventario);     

export default router;
