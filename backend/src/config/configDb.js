"use strict";
import { DataSource } from "typeorm";
import { DATABASE, DB_USERNAME, HOST, PASSWORD } from "./configEnv.js"; // Importando las variables de entorno

// Configuración de la conexión a la base de datos usando TypeORM
export const AppDataSource = new DataSource({
  type: "postgres", // Tipo de base de datos (PostgreSQL)
  host: `${HOST}`, // Host de la base de datos (proporcionado desde el archivo de variables de entorno)
  port: 5432, // Puerto por defecto de PostgreSQL
  username: `${DB_USERNAME}`, // Usuario para la conexión
  password: `${PASSWORD}`, // Contraseña para la conexión
  database: `${DATABASE}`, // Nombre de la base de datos
  entities: ["src/entity/**/*.js",], // Path a las entidades (Modelos de datos) que usará TypeORM
  synchronize: true, // Sincroniza automáticamente el esquema de la base de datos (evitar en producción)
  logging: false, // No se activa el registro de logs (para producción)
});

// Función para inicializar la conexión a la base de datos
export async function connectDB() {
  try {
    // Intentamos inicializar la conexión a la base de datos
    await AppDataSource.initialize();
    console.log("=> Conexión exitosa a la base de datos!"); // Mensaje de éxito
  } catch (error) {
    // Si hay un error, lo capturamos y mostramos el mensaje
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1); // Salimos del proceso con un código de error
  }
}
