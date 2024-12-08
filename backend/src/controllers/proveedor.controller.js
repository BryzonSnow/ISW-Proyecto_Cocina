"use strict";
import { AppDataSource } from "../config/configDb.js";
import ProveedorSchema from "../entity/Proveedor.entity.js";

// Repositorio de Proveedor
const proveedorRepo = AppDataSource.getRepository(ProveedorSchema);

const proveedorController = {
  // Crear un nuevo proveedor
    create: async (req, res) => {
        try {
            const nuevoProveedor = proveedorRepo.create(req.body); // Crear instancia de Proveedor
            const result = await proveedorRepo.save(nuevoProveedor); // Guardar en la BD
        res.status(201).json({
            message: "Proveedor creado con éxito",
            data: result,
        });
        } catch (error) {
            res.status(500).json({
                message: "Error al crear proveedor",
                error: error.message,
            });
        }
    },

  // Obtener todos los proveedores
    getAll: async (_req, res) => {
        try {
            const proveedores = await proveedorRepo.find();
            if (proveedores.length === 0) {
            return res.status(404).json({ message: "No se encontraron proveedores" });
            }
            res.status(200).json(proveedores);
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener los proveedores",
                error: error.message,
            });
        }
    },

  // Obtener proveedor por ID
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const proveedor = await proveedorRepo.findOneBy({ proveedorID: parseInt(id) });
            if (!proveedor) {
                return res.status(404).json({ message: "Proveedor no encontrado" });
            }
            res.status(200).json(proveedor);
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener el proveedor",
                error: error.message,
            });
        }
    },

  // Actualizar proveedor por ID
    update: async (req, res) => {
        const { id } = req.params;
        try {
            const proveedor = await proveedorRepo.findOneBy({ proveedorID: parseInt(id) });
            if (!proveedor) {
                return res.status(404).json({ message: "Proveedor no encontrado" });
            }
            proveedorRepo.merge(proveedor, req.body); // Combinar datos existentes con los nuevos
            const result = await proveedorRepo.save(proveedor); // Guardar cambios en la BD
            res.status(200).json({
                message: "Proveedor actualizado con éxito",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al actualizar el proveedor",
                error: error.message,
            });
        }
    },

  // Eliminar proveedor por ID
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const proveedor = await proveedorRepo.findOneBy({ proveedorID: parseInt(id) });
            if (!proveedor) {
                return res.status(404).json({ message: "Proveedor no encontrado" });
            }
            await proveedorRepo.remove(proveedor); // Eliminar proveedor
            res.status(204).send(); // Sin contenido
        } catch (error) {
            res.status(500).json({
                message: "Error al eliminar el proveedor",
                error: error.message,
            });
        }
    },
};

export default proveedorController;
