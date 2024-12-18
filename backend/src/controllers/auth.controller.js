"use strict";
import { loginService, registerService } from "../services/auth.service.js";
import { sendEmailDefault } from "../controllers/email.controller.js";
import {
  authValidation,
  //cookieValidation,
  registerValidation,
} from "../validations/auth.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

// Función de inicio de sesión
export async function login(req, res) {
  try {
    const { body } = req;
    
    console.log("body", body);
    // Validación de los datos de entrada usando Joi
    const { error } = authValidation.validate(body);

    if (error) {
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }

    // Llamada al servicio de login
    const [accessToken, errorToken] = await loginService(body);

    // Si ocurre un error en el servicio de login
    if (errorToken) {
      return handleErrorClient(res, 400, "Error iniciando sesión", errorToken);
    }

    // Si el login fue exitoso, creamos una cookie con el token
    const decodedPayload = jwt.decode(accessToken);

    res.cookie("jwt", accessToken, { // Crear cookie con el token JWT
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    
    // Decodificar el payload del token
    res.cookie("payload", JSON.stringify(decodedPayload), { // Crear cookie con el payload del token
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 día
      sameSite: "Lax",
    });

    // Respuesta exitosa con el token de acceso
    handleSuccess(res, 200, "Inicio de sesión exitoso", { token: accessToken });
  } catch (error) {
    // Manejo de errores internos del servidor
    handleErrorServer(res, 500, "Error interno del servidor");
  }
}

// Función de registro de usuario
export async function register(req, res) {
  try {
    const { body } = req;

    // Validación de los datos de entrada para el registro
    const { error } = registerValidation.validate(body);

    if (error) {
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }

    // Llamada al servicio de registro
    const [newUser, errorNewUser] = await registerService(body);

    // Si ocurre un error en el servicio de registro
    if (errorNewUser) {
      return handleErrorClient(res, 400, "Error registrando al usuario", errorNewUser);
    }

    const resEmail = await sendEmailDefault({ 
      body: {
        email: body.email,
        subject: "Bienvenido a Restaurante/Cocina",
        message: `Bienvenido nuevo Empleado ${newUser.nombreCompleto}`,
      }
    });

    if (!resEmail.success) {
      console.error("Error enviando el correo:", resEmail.error);
    }

    // Respuesta exitosa con los datos del nuevo usuario
    handleSuccess(res, 201, "Usuario registrado con éxito", newUser);
  } catch (error) {
    // Manejo de errores internos del servidor
    handleErrorServer(res, 500, "Error interno del servidor");
  }
}

// Función de cierre de sesión
export async function logout(req, res) {
  try {
    // Limpiar la cookie del JWT
    res.clearCookie("jwt-auth", { httpOnly: true });

    // Respuesta exitosa al cerrar sesión
    handleSuccess(res, 200, "Sesión cerrada exitosamente");
  } catch (error) {
    // Manejo de errores internos del servidor
    handleErrorServer(res, 500, "Error interno del servidor");
  }
}
