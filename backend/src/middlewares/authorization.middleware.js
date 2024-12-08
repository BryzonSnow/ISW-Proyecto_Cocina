"use strict";
import Empleado from "../entity/Empleado.entity.js";
import { AppDataSource } from "../config/configDb.js";

/**
 * Función para verificar el rol de un empleado.
 * @param {string} requiredRole - El rol requerido para continuar con la solicitud.
 * @returns {Function} Middleware para la verificación del rol.
 */
function checkRole(requiredRole) {
    return async (req, res, next) => {
        try {
            // Asumimos que req.empleadoID está configurado previamente por un middleware de autenticación
            const userRepository = AppDataSource.getRepository(Empleado);
            const userFound = await userRepository.findOneBy({ email: req.empleadoID });

            if (!userFound) {
                return res.status(404).json({
                    status: "Client error",
                    message: "Empleado no encontrado",
                });
            }

            const rolUser = userFound.rol;

            // Verifica si el rol del usuario coincide con el rol requerido
            if (rolUser !== requiredRole) {
                return res.status(403).json({
                    status: "Forbidden",
                    message: `Se requiere un rol de ${requiredRole} para realizar esta acción`,
                });
            }

            next();  // Si el rol coincide, continúa con la solicitud
        } catch (error) {
            res.status(500).json({
                status: "Server error",
                message: "Error en authorization.middleware",
                error: error.message || "Error desconocido",
            });
        }
    };
}

// Middleware para verificar si el empleado es un Chef
export const isChef = checkRole("Chef");

// Middleware para verificar si el empleado es un Admin
export const isAdmin = checkRole("Admin");

// Middleware para verificar si el empleado es un Jefe de Cocina
export const isJefeCocina = checkRole("JefeCocina");

// Middleware para verificar si el empleado es un Mesero
export const isMesero = checkRole("Mesero");
