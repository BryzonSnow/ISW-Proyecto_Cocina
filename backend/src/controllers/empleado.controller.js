"use strict";
import { AppDataSource } from "../config/configDb.js"; 
import EmpleadoSchema from "../entity/Empleado.entity.js"; 

const empleadoController = {
    create: async (req, res) => {
        try {
            const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
            const nuevoEmpleado = empleadoRepo.create(req.body);
            const result = await empleadoRepo.save(nuevoEmpleado);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
            const empleados = await empleadoRepo.find();
            res.status(200).json(empleados);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
            const empleado = await empleadoRepo.findOneBy({ empleadoID: parseInt(req.params.id) }); // Cambiado a empleadoID
            if (!empleado) {
                return res.status(404).json({ message: "Empleado no encontrado" });
            }
            res.status(200).json(empleado);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
            const empleado = await empleadoRepo.findOneBy({ empleadoID: parseInt(req.params.id) }); // Cambiado a empleadoID
            if (!empleado) {
                return res.status(404).json({ message: "Empleado no encontrado" });
            }
            empleadoRepo.merge(empleado, req.body);
            const result = await empleadoRepo.save(empleado);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const empleadoRepo = AppDataSource.getRepository(EmpleadoSchema);
            const empleado = await empleadoRepo.findOneBy({ empleadoID: parseInt(req.params.id) }); // Cambiado a empleadoID
            if (!empleado) {
                return res.status(404).json({ message: "Empleado no encontrado" });
            }
            await empleadoRepo.remove(empleado);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default empleadoController;
