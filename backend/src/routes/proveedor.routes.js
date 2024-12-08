import { Router } from "express";
import proveedorController from "../controllers/proveedor.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

// Ruta para crear un nuevo proveedor (Protegida por autenticación y autorización)
router.post("/", authenticateJwt, isAdmin, proveedorController.create);

// Ruta para obtener todos los proveedores
router.get("/all", proveedorController.getAll);

// Ruta para obtener un proveedor por ID
router.get("/:id", proveedorController.getById);

// Ruta para actualizar un proveedor por ID (Protegida por autenticación y autorización)
router.put("/:id", authenticateJwt, isAdmin, proveedorController.update);

// Ruta para eliminar un proveedor por ID (Protegida por autenticación y autorización)
router.delete("/:id", authenticateJwt, isAdmin, proveedorController.delete);

export default router;

