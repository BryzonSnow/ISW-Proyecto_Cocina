"use strict";
import passport from "passport";

/**
 * Middleware para autenticar la solicitud con JWT.
 * Verifica si el token es válido y permite el acceso al siguiente middleware si es válido.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 * @returns {Object} Respuesta JSON con mensaje de error o acceso al siguiente middleware.
 */
export function authenticateJwt(req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        // Manejo de errores de autenticación en el servidor
        if (err) {
            return res.status(500).json({
                status: "Server error",
                message: "Error de autenticación en el servidor",
                error: err.message || "Error desconocido",
            });
        }

        // Si no se encuentra el usuario, no tiene acceso
        if (!user) {
            return res.status(401).json({
                status: "Unauthorized",
                message: "No tienes permiso para acceder a este recurso",
                info: info ? info.message : "No se encontró el usuario o el token es inválido",
            });
        }

        // Si el token es válido, se agrega el usuario a la solicitud y se pasa al siguiente middleware
        req.user = user;
        next();
    })(req, res, next);
}
