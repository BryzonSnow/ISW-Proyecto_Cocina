import { Router } from "express";
import { createEmpleado, deleteEmpleado, getEmpleado, getEmpleados, updateEmpleado } from "../controllers/empleado.controller.js";

const router = Router();

router.post("/", createEmpleado);
router.get("/all", getEmpleados);
router.get("/:id", getEmpleado);
router.delete("/:id", deleteEmpleado);
router.put("/:id", updateEmpleado);

export default router;