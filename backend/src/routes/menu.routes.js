import { Router } from "express";
import menuController from "../controllers/menu.controller.js";
import { hasRoles, publicAccess } from "../middlewares/authorization.middleware.js";
import { decodeToken } from "../middlewares/authentication.middleware.js";

const router = Router();

// Rutas públicas
router.get("/", publicAccess, menuController.getAll); //Todos pueden ver el menu
router.get("/:id", publicAccess, menuController.getById); //Todos pueden ver un plato específico

// Rutas protegidas
// Rutas protegidas que requieren autenticación y autorización
router.post("/", decodeToken, hasRoles(["Admin", "JefeCocina"]), menuController.create); // Solo "Admin" y "JefeCocina" pueden crear platos
router.put("/:id", decodeToken, hasRoles(["Admin", "JefeCocina"]), menuController.update); 
// Solo "Admin" y "JefeCocina" pueden actualizar platos
router.delete("/:id", decodeToken, hasRoles(["Admin"]), menuController.delete); // Solo "Admin" puede eliminar platos


export default router;
