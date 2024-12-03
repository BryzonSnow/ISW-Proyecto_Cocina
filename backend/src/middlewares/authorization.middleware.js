"use strict";
import { AppDataSource } from "../config/configDb.js";
import Empleado from "../entity/Empleado.entity.js";

export function permitirRoles(...rolesPermitidos) {
    return async (req, res, next) => {
        try {
            if (!req.user || !req.user.email) {
                return res.status(401).json({ message: "No autenticado" });
            }

            const userRepository = AppDataSource.getRepository(Empleado);
            const userFound = await userRepository.findOneBy({ email: req.user.email });

            if (!userFound) {
                return res.status(404).json({ message: "Empleado no encontrado" });
            }

            const rolUsuario = userFound.rol;

            if (!rolesPermitidos.includes(rolUsuario)) {
                return res.status(403).json({
                    message: "No tienes permiso para realizar esta acción",
                });
            }
            next();
        } catch (error) {
            console.error("Error en el middleware de autorización:", error);
            res.status(500).json({ message: "Error en el servidor de autorización" });
        }
    };
}
