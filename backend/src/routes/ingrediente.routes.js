import express from "express";
import ingredienteController from "../controllers/ingrediente.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { permitirRoles } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.get("/", authenticateJwt, ingredienteController.getAll);
router.get("/:id", authenticateJwt, ingredienteController.getById); 

router.post(
    "/",
    authenticateJwt,
    permitirRoles("JefeCocina", "Administrador"),
    ingredienteController.create
);

router.put(
    "/:id",
    authenticateJwt,
    permitirRoles("Chef", "JefeCocina", "Administrador"),
    ingredienteController.update
);

router.delete(
    "/:id",
    authenticateJwt,
    permitirRoles("JefeCocina", "Administrador"),
    ingredienteController.delete
);

export default router;
