"use strict";
import { AppDataSource } from "../config/configDb.js"; 
import InventarioSchema from "../entity/Inventario.entity.js"; 

const inventarioController = {
    create: async (req, res) => {
        try {
            const inventarioRepo = AppDataSource.getRepository(InventarioSchema);
            const nuevoInventario = inventarioRepo.create(req.body);
            const result = await inventarioRepo.save(nuevoInventario);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const inventarioRepo = AppDataSource.getRepository(InventarioSchema);
            const inventarios = await inventarioRepo.find();
            res.status(200).json(inventarios);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const inventarioRepo = AppDataSource.getRepository(InventarioSchema);
            const inventario = await inventarioRepo.findOneBy({ inventarioID: parseInt(req.params.id) }); // Cambiado a inventarioID
            if (!inventario) {
                return res.status(404).json({ message: "Inventario no encontrado" });
            }
            res.status(200).json(inventario);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const inventarioRepo = AppDataSource.getRepository(InventarioSchema);
            const inventario = await inventarioRepo.findOneBy({ inventarioID: parseInt(req.params.id) }); // Cambiado a inventarioID
            if (!inventario) {
                return res.status(404).json({ message: "Inventario no encontrado" });
            }
            inventarioRepo.merge(inventario, req.body);
            const result = await inventarioRepo.save(inventario);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const inventarioRepo = AppDataSource.getRepository(InventarioSchema);
            const inventario = await inventarioRepo.findOneBy({ inventarioID: parseInt(req.params.id) }); // Cambiado a inventarioID
            if (!inventario) {
                return res.status(404).json({ message: "Inventario no encontrado" });
            }
            await inventarioRepo.remove(inventario);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default inventarioController;

