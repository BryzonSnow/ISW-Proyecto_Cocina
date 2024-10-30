import { Router } from "express";
import { createMesero, deleteMesero, getMesero, getMeseros, updateMesero } from "../controllers/mesero.controller.js";

const router = Router();

router.post("/", createMesero);
router.get("/all", getMeseros);
router.get("/:id", getMesero);
router.delete("/:id", deleteMesero);
router.put("/:id", updateMesero);

export default router;