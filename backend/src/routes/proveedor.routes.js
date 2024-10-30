import { Router } from "express";
import { createProveedor, deleteProveedor, getProveedor, getProveedores, updateProveedor } from "../controllers/proveedor.controller.js";

const router = Router();

router.post("/", createProveedor);          
router.get("/all", getProveedores);         
router.get("/:id", getProveedor);           
router.delete("/:id", deleteProveedor);     
router.put("/:id", updateProveedor);        

export default router;
