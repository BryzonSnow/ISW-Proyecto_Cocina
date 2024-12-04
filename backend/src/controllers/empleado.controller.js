"use strict";
import { AppDataSource } from "../config/configDb.js";
import EmpleadoSchema from "../entity/Empleado.entity.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";
import { empleadoBodyValidation, empleadoQueryValidation } from "../validations/empleado.validation.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

const empleadoController = {
  create: async (req, res) => {
    try {
      // Validación del cuerpo de la solicitud
      const { error } = empleadoBodyValidation.validate(req.body);
      if (error) return handleErrorClient(res, 400, "Datos inválidos", error.message);

      // Encriptar la contraseña antes de guardarla
      const encryptedPassword = await encryptPassword(req.body.password);

      // Crear un nuevo empleado con la contraseña encriptada
      const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
      const nuevoEmpleado = empleadoRepo.create({
        ...req.body,
        password: encryptedPassword, // Asignar la contraseña encriptada
      });

      const result = await empleadoRepo.save(nuevoEmpleado); // Guardar en la base de datos
      handleSuccess(res, 201, "Empleado creado exitosamente", result);
    } catch (error) {
      console.error("Error al crear el empleado:", error);
      handleErrorServer(res, 500, error.message);
    }
  },

  getAll: async (req, res) => {
    try {
      const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
      const empleados = await empleadoRepo.find(); // Obtener todos los empleados
      if (empleados.length === 0) return handleSuccess(res, 204, "No hay empleados registrados");

      handleSuccess(res, 200, "Empleados encontrados", empleados);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      handleErrorServer(res, 500, error.message);
    }
  },

  getById: async (req, res) => {
    try {
      const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
      const empleado = await empleadoRepo.findOneBy({ empleadoID: parseInt(req.params.id) });
      if (!empleado) return handleErrorClient(res, 404, "Empleado no encontrado");

      handleSuccess(res, 200, "Empleado encontrado", empleado);
    } catch (error) {
      console.error("Error al obtener empleado por ID:", error);
      handleErrorServer(res, 500, error.message);
    }
  },

  getByQuery: async (req, res) => {
    try {
      const { rut, email } = req.query;

      // Validación de los parámetros de consulta
      const { error } = empleadoQueryValidation.validate({ rut, email });
      if (error) return handleErrorClient(res, 400, "Parámetros inválidos", error.message);

      const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
      const empleado = await empleadoRepo.findOneBy(
        rut ? { rut } : { email } // Buscar por `rut` o `email`
      );

      if (!empleado) return handleErrorClient(res, 404, "Empleado no encontrado");

      handleSuccess(res, 200, "Empleado encontrado", empleado);
    } catch (error) {
      console.error("Error al obtener empleado por consulta:", error);
      handleErrorServer(res, 500, error.message);
    }
  },

  update: async (req, res) => {
    try {
      const { rut, email } = req.query;

      // Validación de los parámetros de consulta
      const { error: queryError } = empleadoQueryValidation.validate({ rut, email });
      if (queryError) return handleErrorClient(res, 400, "Parámetros inválidos", queryError.message);

      // Validación del cuerpo de la solicitud
      const { error: bodyError } = empleadoBodyValidation.validate(req.body);
      if (bodyError) return handleErrorClient(res, 400, "Datos inválidos", bodyError.message);

      const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
      const empleado = await empleadoRepo.findOneBy(
        rut ? { rut } : { email }
      );

      if (!empleado) return handleErrorClient(res, 404, "Empleado no encontrado");

      empleadoRepo.merge(empleado, req.body); // Mezclar datos nuevos
      const result = await empleadoRepo.save(empleado); // Guardar en la base de datos

      handleSuccess(res, 200, "Empleado actualizado correctamente", result);
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      handleErrorServer(res, 500, error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const { rut, email } = req.query;

      // Validación de los parámetros de consulta
      const { error } = empleadoQueryValidation.validate({ rut, email });
      if (error) return handleErrorClient(res, 400, "Parámetros inválidos", error.message);

      const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
      const empleado = await empleadoRepo.findOneBy(
        rut ? { rut } : { email }
      );

      if (!empleado) return handleErrorClient(res, 404, "Empleado no encontrado");

      await empleadoRepo.remove(empleado); // Eliminar empleado
      handleSuccess(res, 204, "Empleado eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
      handleErrorServer(res, 500, error.message);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Buscar el empleado por su email
      const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
      const empleado = await empleadoRepo.findOneBy({ email });

      if (!empleado) {
        return handleErrorClient(res, 401, "Empleado no encontrado");
      }

      // Comparar la contraseña proporcionada con la almacenada
      const isPasswordValid = await comparePassword(password, empleado.password);
      if (!isPasswordValid) {
        return handleErrorClient(res, 401, "Contraseña incorrecta");
      }

      // Generar un JWT
      const token = generateJwt(empleado);  // Esta función debe generar un JWT con la info del empleado

      handleSuccess(res, 200, "Login exitoso", { token });
    } catch (error) {
      console.error("Error al autenticar al empleado:", error);
      handleErrorServer(res, 500, error.message);
    }
  },
};

export default empleadoController;
