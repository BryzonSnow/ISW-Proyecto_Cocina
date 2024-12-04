import express, { json } from "express";
import cors from "cors";  // Importa el paquete CORS
import indexRoutes from "../src/routes/index.routes.js";
import { HOST, PORT } from "../src/config/configEnv.js";
import { connectDB } from "../src/config/configDb.js";
import pedidoRoutes from "./routes/pedido.routes.js";
import { createEmpleado } from "../src/config/initialSetup.js";  // Importamos el setup inicial

async function setupServer() {
    try {
        const app = express();

        // Configuración de CORS
        app.use(cors({
            origin: true,  // Asegúrate de que esta URL corresponde a tu frontend
            credentials: true  // Permitir el envío de cookies y credenciales
        }));

        // Middleware para parsear JSON
        app.use(json());

        // Rutas
        app.use("/pedido", pedidoRoutes);  // Ruta de pedidos
        app.use("/api", indexRoutes);  // Asegúrate de que tus rutas estén bien configuradas

        // Inicializar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en: http://${HOST}:${PORT}/api`);
        });
    } catch (error) {
        console.error("Error en index.js -> setupServer(), el error es: ", error);
    }
}

async function setupAPI() {
    try {
        // Conexión a la base de datos
        await connectDB();

        // Crear el empleado inicial si no existe
        await createEmpleado();  // Se asegura de que el empleado inicial sea creado

        // Iniciar el servidor
        await setupServer();
    } catch (error) {
        console.log("Error en index.js -> setupAPI(), el error es: ", error);
    }
}

setupAPI()
    .then(() => console.log("=> API iniciada exitosamente"))
    .catch((error) => {
        console.log("Error en index.js -> setupAPI(), el error es: ", error);
    });
