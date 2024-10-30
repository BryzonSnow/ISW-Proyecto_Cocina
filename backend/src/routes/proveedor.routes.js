import { Router } from "express";
import proveedorController from "../controllers/proveedor.controller.js";

const router = Router();

router.post("/", proveedorController.create);
router.get("/", proveedorController.getAll);
router.get("/:id", proveedorController.getById);
router.put("/:id", proveedorController.update);
router.delete("/:id", proveedorController.delete);

export default router;
