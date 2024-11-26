import express, { json } from 'express';
import cors from 'cors';  // Importa el paquete CORS
import indexRoutes from '../src/routes/index.routes.js';
import { PORT, HOST } from '../src/config/configEnv.js';
import { connectDB } from '../src/config/configDb.js';

async function setupServer() {
    try {
        const app = express();

        app.use(cors());

        app.use(json());

        app.use('/api', indexRoutes); 
        
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
