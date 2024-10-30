"use strict";
import { AppDataSource } from "../config/configDb.js"; 
import ProveedorSchema from "../entity/Proveedor.entity.js"; 

const proveedorController = {
    create: async (req, res) => {
        try {
            const proveedorRepo = AppDataSource.getRepository(ProveedorSchema);
            const nuevoProveedor = proveedorRepo.create(req.body);
            const result = await proveedorRepo.save(nuevoProveedor);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const proveedorRepo = AppDataSource.getRepository(ProveedorSchema);
            const proveedores = await proveedorRepo.find();
            res.status(200).json(proveedores);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const proveedorRepo = AppDataSource.getRepository(ProveedorSchema);
            const proveedor = await proveedorRepo.findOneBy({ proveedorID: parseInt(req.params.id) }); // Cambiado a findOneBy
            if (!proveedor) {
                return res.status(404).json({ message: "Proveedor no encontrado" });
            }
            res.status(200).json(proveedor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const proveedorRepo = AppDataSource.getRepository(ProveedorSchema);
            const proveedor = await proveedorRepo.findOneBy({ proveedorID: parseInt(req.params.id) }); // Cambiado a findOneBy
            if (!proveedor) {
                return res.status(404).json({ message: "Proveedor no encontrado" });
            }
            proveedorRepo.merge(proveedor, req.body);
            const result = await proveedorRepo.save(proveedor);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const proveedorRepo = AppDataSource.getRepository(ProveedorSchema);
            const proveedor = await proveedorRepo.findOneBy({ proveedorID: parseInt(req.params.id) }); // Cambiado a findOneBy
            if (!proveedor) {
                return res.status(404).json({ message: "Proveedor no encontrado" });
            }
            await proveedorRepo.remove(proveedor);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default proveedorController;
