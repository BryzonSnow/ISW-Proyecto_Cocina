import { Router } from "express";
import inventarioController from "../controllers/inventario.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { permitirRoles } from "../middlewares/authorization.middleware.js";

const router = Router();

router.get("/", authenticateJwt, inventarioController.getAll);

router.get("/:id", authenticateJwt, inventarioController.getById);

router.post(
    "/",
    authenticateJwt,
    permitirRoles("JefeCocina", "Administrador"),  
    inventarioController.create
);

router.put(
    "/:id",
    authenticateJwt,
    permitirRoles("JefeCocina", "Administrador"),
    inventarioController.update
);

router.delete(
    "/:id",
    authenticateJwt,
    permitirRoles("JefeCocina", "Administrador"),
    inventarioController.delete
);

export default router;
