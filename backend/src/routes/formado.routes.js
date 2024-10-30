import { Router } from "express";
import { createFormado, deleteFormado, getFormado, getFormados, updateFormado } from "../controllers/formado.controller.js";

const router = Router();

router.post("/", createFormado);
router.get("/all", getFormados);
router.get("/:id", getFormado);
router.delete("/:id", deleteFormado);
router.put("/:id", updateFormado);

export default router;