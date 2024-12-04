"use strict";
import { Router } from "express";
import { permitirRoles } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import empleadoController from "../controllers/empleado.controller.js";

const router = Router();

// Rutas protegidas por autenticación (JWT) y autorización (Roles)
// Rutas de creación de empleado (solo accesibles por administradores)
router.use("/create", authenticateJwt, permitirRoles("administrador"));
router.post("/create", empleadoController.create); // Crear un nuevo empleado

// Rutas para obtener todos los empleados (accesibles solo por administradores)
router.get("/all", authenticateJwt, permitirRoles("administrador"));
router.get("/all", empleadoController.getAll); // Obtener todos los empleados

// Ruta para obtener un empleado por ID (accesible por cualquier usuario autenticado)
router.get("/:id", authenticateJwt, empleadoController.getById); // Obtener un empleado por ID

// Ruta para obtener un empleado mediante consulta (por `rut` o `email`)
router.get("/query", authenticateJwt, empleadoController.getByQuery); // Obtener empleado por `rut` o `email`

// Ruta para actualizar un empleado (accesible solo por administradores)
router.put("/update", authenticateJwt, permitirRoles("administrador"));
router.put("/update", empleadoController.update); // Actualizar un empleado

// Ruta para eliminar un empleado (accesible solo por administradores)
router.delete("/delete", authenticateJwt, permitirRoles("administrador"));
router.delete("/delete", empleadoController.delete); // Eliminar un empleado

// Ruta de login para empleados
router.post("/login", empleadoController.login); // Login de un empleado

export default router;
