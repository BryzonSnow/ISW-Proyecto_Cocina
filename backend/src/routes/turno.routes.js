import { Router } from "express";
import turnoController from "../controllers/turno.controller.js";

const router = Router();

router.post("/", turnoController.create);
router.get("/", turnoController.getAll);
router.get("/:id", turnoController.getById);
router.put("/:id", turnoController.update);
router.delete("/:id", turnoController.delete);

export default router;
