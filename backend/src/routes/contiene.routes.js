import { Router } from "express";
import { createContiene, deleteContiene, getContiene, getContienen, updateContiene } from "../controllers/contiene.controller.js";

const router = Router();

router.post("/", createContiene);
router.get("/all", getContienen);
router.get("/:id", getContiene);
router.delete("/:id", deleteContiene);
router.put("/:id", updateContiene);

export default router;