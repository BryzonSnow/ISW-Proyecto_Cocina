import { Router } from "express";
import empleadoController from "../controllers/empleado.controller.js";
import { isMesero, isAdmin, isChef, isJefeCocina } from "../middlewares/authorization.middleware.js";

const router = Router();

router
    .use(authenticateJwt) // Verifico si inicio sesión
    .use(isJefeCocina) //verifica su rol
    .use(isAdmin)
    .use(isChef)
    .use(isMesero); 

router.post("/", empleadoController.create);
router.get("/", empleadoController.getAll);
router.get("/:id", empleadoController.getById);
router.put("/:id", empleadoController.update);
router.delete("/:id", empleadoController.delete);

export default router;