import { Router } from "express";
import { createMenu, deleteMenu, getMenuById, getMenus, updateMenu } from "../controllers/menu.controller";

const router = Router();

router.get("/menus", getMenus);
router.get("/menus/:id", getMenuById);
router.post("/menus", createMenu);
router.put("/menus/:id", updateMenu);
router.delete("/menus/:id", deleteMenu);

export default router;