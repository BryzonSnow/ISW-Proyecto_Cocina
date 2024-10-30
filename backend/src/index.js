<<<<<<< HEAD
import express, { json } from "express";
import indexRoutes from "../src/routes/index.routes.js";
import { HOST, PORT } from "../src/config/configEnv.js";
import { connectDB } from "../src/config/configDb.js";
=======
import express, { json } from 'express';
import indexRoutes from '../src/routes/index.routes.js';
import { PORT, HOST } from '../src/config/configEnv.js';
import { connectDB } from '../src/config/configDb.js';
>>>>>>> upstream/main

async function setupServer() {
    try {
        const app = express();

        app.use(json());

<<<<<<< HEAD
        app.use("/api", indexRoutes)
=======
        app.use('/api', indexRoutes)
>>>>>>> upstream/main
        
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en: http://${HOST}:${PORT}/api`);
        });
        }
<<<<<<< HEAD
    catch (error) {
=======
     catch (error) {
>>>>>>> upstream/main
        console.error("Error en index.js -> setupServer(), el error es: ", error)
    }
}

async function setupAPI() {
    try {
        await connectDB();
        await setupServer();
    } catch (error) {
        console.log("Error en index.js -> setupApi(), el error es: ", error)
    }
} 

setupAPI()
    .then(() => console.log("=> API iniciada exitosamente"))
    .catch((error) => {
        console.log("Error en index.js -> setupAPI(), el error es: ", error);
    });