import express, { json } from "express";
import cors from "cors";  // Importa el paquete CORS
import indexRoutes from "../src/routes/index.routes.js";
import { HOST, PORT } from "../src/config/configEnv.js";
import { connectDB } from "../src/config/configDb.js";
import pedidoRoutes from "./routes/pedido.routes.js";

async function setupServer() {
    try {
        const app = express();

        app.use(cors());

        app.use(cors({
            origin: true,  // URL de tu frontend
            credentials: true  // Permitir el envío de cookies y credenciales
        }));

        app.use("/pedido", pedidoRoutes);

        app.use(json());

        app.use("/api", indexRoutes); 

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
    } catch (error) {
        console.log("Error en index.js -> setupAPI(), el error es: ", error);
    }
}

setupAPI()
    .then(() => console.log("=> API iniciada exitosamente"))
    .catch((error) => {
        console.log("Error en index.js -> setupAPI(), el error es: ", error);
    });