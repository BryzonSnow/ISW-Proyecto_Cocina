"use strict";
import Empleado from "../entity/Empleado.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";

// Middleware para verificar roles específicos
export const hasRoles = (roles) => async (req, res, next) => {
    try {
        const userRepository = AppDataSource.getRepository(Empleado);
        const userFound = await userRepository.findOneBy({ email: req.empleadoID });

        if (!userFound) {
            return handleErrorClient(res, 404, "Empleado no encontrado en la base de datos");
        }

        if (!roles.includes(userFound.rol)) {
            return handleErrorClient(
                res,
                403,
                "Acceso denegado",
                `Se requiere uno de los roles: ${roles.join(", ")} para realizar esta acción.`
            );
        }

        next(); // El usuario tiene un rol válido, continúa con la solicitud
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
};

// Middleware para roles específicos con lógica personalizada
export async function isChef(req, res, next) {
    try {
        const userRepository = AppDataSource.getRepository(Empleado);
        const userFound = await userRepository.findOneBy({ email: req.empleadoID });

        if (!userFound) {
            return handleErrorClient(res, 404, "Empleado no encontrado en la base de datos");
        }

        if (userFound.rol !== "Chef") {
            return handleErrorClient(
                res,
                403,
                "Acceso denegado",
                "Se requiere un rol de Chef para realizar esta acción."
            );
        }

        next();
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function isAdmin(req, res, next) {
    try {
        const userRepository = AppDataSource.getRepository(Empleado);
        const userFound = await userRepository.findOneBy({ email: req.empleadoID });

        if (!userFound) {
            return handleErrorClient(res, 404, "Empleado no encontrado en la base de datos");
        }

        if (userFound.rol !== "Administrador") {
            return handleErrorClient(
                res,
                403,
                "Acceso denegado",
                "Se requiere un rol de administrador para realizar esta acción."
            );
        }

        next();
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function isJefeCocina(req, res, next) {
    try {
        const userRepository = AppDataSource.getRepository(Empleado);
        const userFound = await userRepository.findOneBy({ email: req.empleadoID });

        if (!userFound) {
            return handleErrorClient(res, 404, "Empleado no encontrado en la base de datos");
        }

        if (userFound.rol !== "JefeCocina") {
            return handleErrorClient(
                res,
                403,
                "Acceso denegado",
                "Se requiere un rol de Jefe de Cocina para realizar esta acción."
            );
        }

        next();
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function isMesero(req, res, next) {
    try {
        const userRepository = AppDataSource.getRepository(Empleado);
        const userFound = await userRepository.findOneBy({ email: req.empleadoID });

        if (!userFound) {
            return handleErrorClient(res, 404, "Empleado no encontrado en la base de datos");
        }

        if (userFound.rol !== "Mesero") {
            return handleErrorClient(
                res,
                403,
                "Acceso denegado",
                "Se requiere un rol de Mesero para realizar esta acción."
            );
        }

        next();
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

// Middleware para acceso público
export const publicAccess = (req, res, next) => {
    next(); // Continúa sin restricciones
};

