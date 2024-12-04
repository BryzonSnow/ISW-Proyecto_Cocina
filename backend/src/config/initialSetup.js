"use strict";
import { AppDataSource } from "./configDb.js";  // Asegúrate de que esta ruta sea la correcta
import Empleado from "../entity/Empleado.entity.js";  // Asegúrate de que la entidad Empleado esté definida

async function createEmpleado() {
  try {
    const empleadoRepository = AppDataSource.getRepository(Empleado);

    // Verificar si ya existen empleados (para no crear duplicados)
    const count = await empleadoRepository.count();
    if (count > 0) return;

    // Crear un nuevo empleado con los datos proporcionados
    await empleadoRepository.save(
      empleadoRepository.create({
        nombre: "Nicolas Ignacio Jimenez Villarroel",
        contacto: "+56963211200",
        rut: "20.953.975-6",
        email: "jimeneznicolas017@gmail.com",
        rol: "Administrador",
        password: "123" 
      }),
    );

    console.log("* => Empleado creado exitosamente");
  } catch (error) {
    console.error("Error al crear empleado:", error);
  }
}

export { createEmpleado };
