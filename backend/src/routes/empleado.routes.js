import { Router } from "express";
import empleadoController from "../controllers/empleado.controller.js";
//import { isAdmin, isChef, isJefeCocina, isMesero } from "../middlewares/authorization.middleware.js";

const router = Router();

router.post("/", empleadoController.create);
router.get("/", empleadoController.getAll);
router.get("/:id", empleadoController.getById);
router.put("/:id", empleadoController.update);
router.delete("/:id", empleadoController.delete);

export default router;