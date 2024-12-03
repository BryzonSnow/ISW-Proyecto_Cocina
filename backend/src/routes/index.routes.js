import { Router } from "express";
import turnoRoutes from "../routes/turno.routes.js";
import inventarioRoutes from "../routes/inventario.routes.js";
import ingredienteRoutes from "../routes/ingrediente.routes.js";
import proveedorRoutes from "../routes/proveedor.routes.js";
import menuRoutes from "../routes/menu.routes.js";
import clienteRoutes from "../routes/cliente.routes.js";
import empleadoRoutes from "../routes/empleado.routes.js";
import platoRoutes from "../routes/plato.routes.js"; 
import pedidoRoutes from "./pedido.routes.js";

const router = Router();

router.use("/turno", turnoRoutes);
router.use("/inventario", inventarioRoutes);
router.use("/ingrediente", ingredienteRoutes);
router.use("/proveedor", proveedorRoutes);
router.use("/menu", menuRoutes);
router.use("/cliente", clienteRoutes);
router.use("/empleado", empleadoRoutes);
router.use("/plato", platoRoutes); 
router.use("/pedido", pedidoRoutes); 

export default router;
