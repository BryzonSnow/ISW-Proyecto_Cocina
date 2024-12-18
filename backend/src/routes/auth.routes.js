"use strict";
import { Router } from "express";
import { body, validationResult } from "express-validator";
import { login, logout, register } from "../controllers/auth.controller.js";

const router = Router();

// Validación de datos de login
const loginValidation = [
  body("email").isEmail().withMessage("El correo electrónico no es válido"),
  body("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres")
];

// Validación de datos de registro
const registerValidation = [
  body("email").isEmail().withMessage("El correo electrónico no es válido"),
  body("rut").custom((value) => {
    // Aquí puedes integrar la función de validación del RUT que te proporcioné antes
    return validarRUT(value);
  }).withMessage("El RUT no es válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/).withMessage("La contraseña debe contener al menos una letra mayúscula")
    .matches(/[a-z]/).withMessage("La contraseña debe contener al menos una letra minúscula")
    .matches(/\d/).withMessage("La contraseña debe contener al menos un número")
];

// Ruta para iniciar sesión
router.post("/login", loginValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  login(req, res);
});

// Ruta para registrar un nuevo usuario
router.post("/register", registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  register(req, res);
});

// Ruta para cerrar sesión (eliminar el JWT del cliente)
// Asegúrate de que solo un usuario autenticado pueda cerrar sesión
router.post("/logout", (req, res) => {
  // Verificar si el usuario está autenticado, si no lo está, no permitir el logout
  if (!req.user) {  // Supongo que `req.user` es un objeto que contiene los datos del usuario autenticado
    return res.status(401).json({ message: "No estás autenticado" });
  }
  logout(req, res);
});

// Manejador de errores global para capturar errores no gestionados
router.use((err, req, res) => {
  console.error(err);  // Para depuración
  res.status(500).json({
    status: "Server error",
    message: "Ocurrió un error inesperado",
  });
});

export default router;