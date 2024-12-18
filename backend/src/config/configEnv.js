"use strict";
import { fileURLToPath } from "url";  // Para trabajar con rutas en módulos ES
import path from "path";  // Para manipular rutas de archivos
import dotenv from "dotenv";  // Para cargar las variables de entorno desde el archivo .env

// Obtener la ruta absoluta del archivo actual (configEnv.js)
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// Definir la ruta al archivo .env
const envFilePath = path.resolve(_dirname, ".env");

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: envFilePath });

// Exportar las variables de entorno necesarias para la conexión y configuración
export const PORT = process.env.PORT;  // Puerto en el que el servidor escuchará
export const HOST = process.env.HOST;  // Host de la base de datos
export const DB_USERNAME = process.env.DB_USERNAME;  // Usuario para la base de datos
export const PASSWORD = process.env.PASSWORD;  // Contraseña para la base de datos
export const DATABASE = process.env.DATABASE;  // Nombre de la base de datos
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;  // Secreto para JWT
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;  // Secreto para JWT
export const cookieKey = process.env.cookieKey;  // Clave para las cookies
export const emailConfig = {
    service: "gmail",
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
};