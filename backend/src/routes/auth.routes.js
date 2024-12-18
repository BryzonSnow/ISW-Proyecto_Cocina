"use strict";
import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

const router = Router();

// Ruta para iniciar sesión
router.post("/login", login);

// Ruta para registrar un nuevo usuario
router.post("/register", register);

// Ruta para cerrar sesión (eliminar el JWT del cliente)
router.post("/logout", logout);

// Manejador de errores global para capturar errores no gestionados
router.use((err, req, res, next) => {
  console.error(err);  // Para depuración
  res.status(500).json({
    status: "Server error",
    message: "Ocurrió un error inesperado",
  });
});

export default router;
