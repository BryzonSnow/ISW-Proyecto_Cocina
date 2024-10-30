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

router.use("/empleado", empleadoRoutes);
router.use("/api/turno", turnoRoutes);
router.use("/api/inventario", inventarioRoutes);
router.use("/api/ingrediente", ingredienteRoutes);
router.use("/api/proveedor", proveedorRoutes);
router.use("/api/menu", menuRoutes);
router.use("/api/cliente", clienteRoutes);
router.use("/api/empleado", empleadoRoutes);
router.use("/api/plato", platoRoutes); 
router.use("/api/pedido", pedidoRoutes); 

export default router;