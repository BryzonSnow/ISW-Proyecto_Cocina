"use strict";
import { AppDataSource } from "../config/configDb.js";
import IngredienteSchema from "../entity/Ingrediente.entity.js"; 

const ingredienteController = {
    // Crear un ingrediente (Solo JefeCocina y Administrador)
    create: async (req, res) => {
        try {
            const ingredienteRepo = AppDataSource.getRepository(IngredienteSchema);
            const nuevoIngrediente = ingredienteRepo.create(req.body);
            const result = await ingredienteRepo.save(nuevoIngrediente);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtener todos los ingredientes (Todos los roles pueden ver)
    getAll: async (req, res) => {
        try {
            const ingredienteRepo = AppDataSource.getRepository(IngredienteSchema);
            const ingredientes = await ingredienteRepo.find();
            res.status(200).json(ingredientes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtener ingrediente por ID (Todos los roles pueden ver por ID)
    getById: async (req, res) => {
        try {
            const ingredienteRepo = AppDataSource.getRepository(IngredienteSchema);
            const ingrediente = await ingredienteRepo.findOneBy({ ingredienteID: parseInt(req.params.id) });
            if (!ingrediente) {
                return res.status(404).json({ message: "Ingrediente no encontrado" });
            }
            res.status(200).json(ingrediente);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Actualizar ingrediente (Solo Chef puede actualizar)
    update: async (req, res) => {
        try {
            const ingredienteRepo = AppDataSource.getRepository(IngredienteSchema);
            const ingrediente = await ingredienteRepo.findOneBy({ ingredienteID: parseInt(req.params.id) });
            if (!ingrediente) {
                return res.status(404).json({ message: "Ingrediente no encontrado" });
            }
            ingredienteRepo.merge(ingrediente, req.body);
            const result = await ingredienteRepo.save(ingrediente);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Eliminar ingrediente (Solo JefeCocina y Administrador pueden borrar)
    delete: async (req, res) => {
        try {
            const ingredienteRepo = AppDataSource.getRepository(IngredienteSchema);
            const ingrediente = await ingredienteRepo.findOneBy({ ingredienteID: parseInt(req.params.id) });
            if (!ingrediente) {
                return res.status(404).json({ message: "Ingrediente no encontrado" });
            }
            await ingredienteRepo.remove(ingrediente);
            res.status(204).send(); // Eliminado correctamente
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default ingredienteController;
