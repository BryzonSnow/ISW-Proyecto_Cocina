"use strict";
import passport from "passport";

export function authenticateJwt(req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if(err) {
            return res.status(500).json({ message: "Error de autenticación en el servidor" });
        }

        if(!user) {
            return res.status(401).json({
                message: "No tienes permiso para acceder a este recurso",
                info: info ? info.message : "No se encontró el usuario"
            })
        }

        req.user = user;
        next();
    })(req, res, next);
}

// Middleware para decodificar el token y extraer el ID del usuario
export const decodeToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token no proporcionado." });
        }

        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.empleadoID = decoded.email; // Usar el email u otra propiedad como identificador
        req.rol = decoded.rol; // Almacenar el rol para usarlo en otros middlewares
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido o expirado." });
    }
};
