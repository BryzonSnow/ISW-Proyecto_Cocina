"use strict";
import Empleado from "../entity/Empleado.entity.js";
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

async function createEmpleados() {
  try {
    const empleadoRepository = AppDataSource.getRepository(Empleado);

    const count = await empleadoRepository.count();
    if (count > 0) return;

    await Promise.all([
      empleadoRepository.save(
        empleadoRepository.create({
          nombre: "Diego Alexis Salazar Jara",
          rut: "21.308.770-3",
          email: "administrador2024@gmail.cl",
          password: await encryptPassword("admin1234"),
          rol: "Administrador",
        })
      ),
      empleadoRepository.save(
        empleadoRepository.create({
          nombre: "Diego Sebastián Ampuero Belmar",
          rut: "21.151.897-9",
          email: "usuario1.2024@gmail.cl",
          password: await encryptPassword("empleado1234"),
          rol: "Mesero",
        })
      ),
        empleadoRepository.save(
          empleadoRepository.create({
            nombre: "Alexander Benjamín Marcelo Carrasco Fuentes",
            rut: "20.630.735-8",
            email: "usuario2.2024@gmail.cl",
            password: await encryptPassword("empleado1234"),
            rol: "Chef",
          }),
      ),
      empleadoRepository.save(
        empleadoRepository.create({
          nombre: "Pablo Andrés Castillo Fernández",
          rut: "20.738.450-K",
          email: "usuario3.2024@gmail.cl",
          password: await encryptPassword("empleado1234"),
          rol: "Mesero",
        }),
      ),
      empleadoRepository.save(
        empleadoRepository.create({
          nombre: "Felipe Andrés Henríquez Zapata",
          rut: "20.976.635-3",
          email: "usuario4.2024@gmail.cl",
          password: await encryptPassword("empleado1234"),
          rol: "JefeCocina",
        }),
      ),
      empleadoRepository.save(
        empleadoRepository.create({
          nombre: "Diego Alexis Meza Ortega",
          rut: "21.172.447-1",
          email: "usuario5.2024@gmail.cl",
          password: await encryptPassword("empleado1234"),
          rol: "Chef",
        }),
      ),
      empleadoRepository.save(
        empleadoRepository.create({
          nombre: "Juan Pablo Rosas Martin",
          rut: "20.738.415-1",
          email: "usuario6.2024@gmail.cl",
          password: await encryptPassword("empleado1234"),
          rol: "Mesero",
        }),
      ),
    ]);
    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

export { createEmpleados };