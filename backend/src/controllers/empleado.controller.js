import { AppDataSource } from "../config/configDb.js";
import EmpleadoSchema from "../entity/Empleado.entity.js";

const empleadoController = {
  create: async (req, res) => {
    try {
      const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
      const nuevoEmpleado = empleadoRepo.create(req.body); // Crear el nuevo empleado con los datos de la solicitud
      const result = await empleadoRepo.save(nuevoEmpleado); // Guardar el empleado en la base de datos
      res.status(201).json(result); // Retornar el nuevo empleado
    } catch (error) {
      console.error("Error al crear el empleado:", error);
      res.status(500).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
      const empleados = await empleadoRepo.find(); // Obtener todos los empleados
      res.status(200).json(empleados); // Retornar la lista de empleados
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
      const empleado = await empleadoRepo.findOneBy({ empleadoID: parseInt(req.params.id) });
      if (!empleado) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }
      res.status(200).json(empleado);
    } catch (error) {
      console.error("Error al obtener empleado por ID:", error);
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
      const empleado = await empleadoRepo.findOneBy({ empleadoID: parseInt(req.params.id) });
      if (!empleado) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }
      empleadoRepo.merge(empleado, req.body); // Mezclar los nuevos datos con el existente
      const result = await empleadoRepo.save(empleado);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
      const empleado = await empleadoRepo.findOneBy({ empleadoID: parseInt(req.params.id) });
  
      if (!empleado) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }
  
      await empleadoRepo.remove(empleado);
      res.status(204).send(); // Eliminación exitosa
    } catch (error) {
      // Agregar más detalles del error
      console.error("Error al eliminar empleado:", error.message, error.stack);
      res.status(500).json({ message: "Error al eliminar el empleado", error: error.message });
    }
  }
};

export default empleadoController;