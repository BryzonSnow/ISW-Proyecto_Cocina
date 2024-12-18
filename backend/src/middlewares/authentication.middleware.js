"use strict";
import passport from "passport";
import {
    handleErrorClient,
    handleErrorServer,
} from "../handlers/responseHandlers.js";
import empleado from "../entity/Empleado.entity.js";

export function authenticateJwt(req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, empleado, info) => {
        if (err) {
        return handleErrorServer(
            res,
            500,
            "Error de autenticación en el servidor"
        );
        }

console.log(req);

        if (!empleado) {
        return handleErrorClient(
            res,
            401,
            "No tienes permiso para acceder a este recurso",
            { info: info ? info.message : "No se encontró el usuario" }
        )
        }

        req.empleado = empleado;
        next();
    })(req, res, next);
}
