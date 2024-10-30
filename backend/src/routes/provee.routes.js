import { Router } from "express";
import { createProvee, deleteProvee, getProvee, getProveen, updateProvee } from "../controllers/provee.controller.js";

const router = Router();

router.post("/", createProvee);
router.get("/all", getProveen);
router.get("/:id", getProvee);
router.delete("/:id", deleteProvee);
router.put("/:id", updateProvee);

export default router;