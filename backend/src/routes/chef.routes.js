import { Router } from "express";
import { createChef, deleteChef, getChef, getChefs, updateChef } from "../controllers/chef.controller.js";

const router = Router();

router.post("/", createChef);
router.get("/all", getChefs);
router.get("/:id", getChef);
router.delete("/:id", deleteChef);
router.put("/:id", updateChef);

export default router;