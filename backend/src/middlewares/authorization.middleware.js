"use strict";
import Empleado from "../entity/Empleado.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function isChef(req, res, next) {
    try {
        const userRepository = AppDataSource.getRepository(Empleado);
        const userFound = await userRepository.findOneBy({ email: req.empleadoID });

        if (!userFound) {
            return res.status(404).json({
                message: "Empleado no encontrado",
            });
        }

        const rolUser = userFound.rol;

        // Verifica si el rol del usuario es "chef"
        if (rolUser !== "Chef") {
            return res.status(403).json({
                message: "Se requiere un rol de chef para realizar esta acción"  
            });
        }

        next();  // Si el rol es chef, continúa con la solicitud
    } catch (error) {
        res.status(500).json({
            message: "Error en authorization.middleware"
        });
    }
}

export async function isAdmin(req, res, next) {
    try {
        const userRepository = AppDataSource.getRepository(Empleado);
        const userFound = await userRepository.findOneBy({ email: req.empleadoID });

        if (!userFound) {
            return res.status(404).json({
                message: "Empleado no encontrado",
            });
        }

        const rolUser = userFound.rol;

        // Verifica si el rol del usuario es "admin"
        if (rolUser !== "Admin") {
            return res.status(403).json({
                message: "Se requiere un rol de administrador para realizar esta acción"  
            });
        }

        next();  // Si el rol es admin, continúa con la solicitud
    } catch (error) {
        res.status(500).json({
            message: "Error en authorization.middleware"
        });
    }
}
export async function isJefeCocina(req, res, next) {
    try {
        const userRepository = AppDataSource.getRepository(Empleado);
        const userFound = await userRepository.findOneBy({ email: req.empleadoID });

        if (!userFound) {
            return res.status(404).json({
                message: "Empleado no encontrado",
            });
        }

        const rolUser = userFound.rol;

        // Verifica si el rol del usuario es "Jefe de cocina"
        if (rolUser !== "JefeCocina") {
            return res.status(403).json({
                message: "Se requiere un rol de Jefe de cocina para realizar esta acción"  
            });
        }

        next();  // Si el rol es jefe de cocina, continúa con la solicitud
    } catch (error) {
        res.status(500).json({
            message: "Error en authorization.middleware"
        });
    }
}
export async function isMesero(req, res, next) {
    try {
        const userRepository = AppDataSource.getRepository(Empleado);
        const userFound = await userRepository.findOneBy({ email: req.empleadoID });

        if (!userFound) {
            return res.status(404).json({
                message: "Empleado no encontrado",
            });
        }

        const rolUser = userFound.rol;

        // Verifica si el rol del usuario es "mesero"
        if (rolUser !== "Mesero") {
            return res.status(403).json({
                message: "Se requiere un rol de mesero para realizar esta acción"  
            });
        }

        next();  // Si el rol es mesero, continúa con la solicitud
    } catch (error) {
        res.status(500).json({
            message: "Error en authorization.middleware"
        });
    }
};