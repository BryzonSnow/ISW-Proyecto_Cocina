"use strict";
import express, { json, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { cookieKey, HOST, PORT } from "./config/configEnv.js";
import { connectDB } from "./config/configDb.js";
import { createUsers } from "./config/initialSetup.js";  // Si es necesario para la creación de usuarios iniciales
import { passportJwtSetup } from "./auth/passport.auth.js";  // Configuración de Passport JWT
import indexRoutes from "./routes/index.routes.js";  // Rutas principales de la API
import authRoutes from "./routes/auth.routes.js";  // Rutas de autenticación (Login, Registro)
import { authenticateJwt } from "./middlewares/authentication.middleware.js";  // Middleware de autenticación
import { isAdmin } from "./middlewares/authorization.middleware.js";  // Middleware de autorización (por ejemplo, admin)


async function setupServer() {
    try {
        const app = express();
        // Configuración de CORS
        
        app.disable("x-powered-by");

        app.use(cors({
            origin: true,  // URL de tu frontend
            credentials: true  // Permitir el envío de cookies y credenciales
        }));

        app.use(
            urlencoded({
              extended: true,
              limit: "1mb",
            }),
          );

        app.use(json(
            {
                limit: "1mb",
            }
        ));

        app.use(cookieParser());

        app.use(morgan("dev"));

        app.use(
            session({
              secret: cookieKey,
              resave: false,
              saveUninitialized: false,
              cookie: {
                secure: false,
                httpOnly: true,
                sameSite: "strict",
              },
            }),
          );
      
          app.use(passport.initialize());
          app.use(passport.session());
      
          passportJwtSetup();

        // Rutas de la API
        app.use("/api", indexRoutes);  // Asegúrate de que tus rutas estén bien configuradas
        
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en: http://${HOST}:${PORT}/api`);
        });
    } catch (error) {
        console.error("Error en index.js -> setupServer(), el error es: ", error);
    }
}

async function setupAPI() {
    try {
        await connectDB();
        await setupServer();
        await createUsers();  // Si es necesario para la creación de usuarios iniciales
    } catch (error) {
        console.log("Error en index.js -> setupAPI(), el error es: ", error);
    }
}

setupAPI()
    .then(() => console.log("=> API iniciada exitosamente"))
    .catch((error) => {
        console.log("Error en index.js -> setupAPI(), el error es: ", error);
    });
