import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js"; 
import { createProveedor, 
    deleteProveedor, 
    getProveedor, 
    getProveedores,   
    updateProveedor,      
} from "../controllers/proveedor.controller.js";


const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

router
    .get("/all", getProveedores)
    .get("/:id", getProveedor)
    .post("/", createProveedor)
    .put("/:id", updateProveedor)
    .delete("/:id", deleteProveedor);

export default router;
