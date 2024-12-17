"use strict";
import { loginService, registerService } from "../services/auth.service.js";
import {
  authValidation,
  registerValidation,
} from "../validations/auth.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";
import jwt from "jsonwebtoken";


export async function login(req, res) {
  try {
    const { body } = req;

console.log("body", body);

    const { error } = authValidation.validate(body);

    if (error) {
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }
    const [accessToken, errorToken] = await loginService(body);

    if (errorToken) return handleErrorClient(res, 400, "Error iniciando sesión", errorToken);

    // Decodificar el payload del token
    const decodedPayload = jwt.decode(accessToken);

    res.cookie("jwt", accessToken, { // Crear cookie con el token JWT
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("payload", JSON.stringify(decodedPayload), { // Crear cookie con el payload del token
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 día
      sameSite: "Lax",
    });

    handleSuccess(res, 200, "Inicio de sesión exitoso", { token: accessToken });
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function register(req, res) {
  try {
    const { body } = req;

    const { error } = registerValidation.validate(body);

    if (error)
      return handleErrorClient(res, 400, "Error de validación", error.message);

    const [newUser, errorNewUser] = await registerService(body);

    if (errorNewUser) return handleErrorClient(res, 400, "Error registrando al usuario", errorNewUser);

    handleSuccess(res, 201, "Usuario registrado con éxito", newUser);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt", { httpOnly: true });
    handleSuccess(res, 200, "Sesión cerrada exitosamente");
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}