"use strict";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
    handleErrorClient,
    handleErrorServer,
} from "../handlers/responseHandlers.js";

const secretKey = "your_secret_key";  // La clave secreta para verificar el JWT

export function authenticateJwt(req, res, next) {  
    passport.authenticate("jwt", { session: false }, (err, empleado, info) => {
        if (err) {
            return handleErrorServer(
                res,
                500,
                "Error de autenticación en el servidor"
            );
        }

        if (!empleado) {
            return handleErrorClient(
                res,
                401,
                "No tienes permiso para acceder a este recurso",
                { info: info ? info.message : "No se encontró el empleado" }
            );
        }

        // Verificar la validez del token (expiración y firma)
        const token = req.headers["authorization"]?.split(" ")[1]; // Extrae el token del header Authorization
        if (!token) {
            return handleErrorClient(res, 401, "Token no proporcionado");
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return handleErrorClient(res, 401, "Token inválido o expirado");
            }
            req.empleado = decoded; // Si el token es válido, guarda los datos en la solicitud
            next(); // Continúa con la solicitud
        });
    })(req, res, next);
}

export { handleErrorServer, handleErrorClient };
