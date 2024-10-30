"use strict";
import { AppDataSource } from "../config/configDb.js"; 
import IngredienteSchema from "../entity/Ingrediente.entity.js"; 

const ingredienteController = {
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

    getAll: async (req, res) => {
        try {
            const ingredienteRepo = AppDataSource.getRepository(IngredienteSchema);
            const ingredientes = await ingredienteRepo.find();
            res.status(200).json(ingredientes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const ingredienteRepo = AppDataSource.getRepository(IngredienteSchema);
            const ingrediente = await ingredienteRepo.findOneBy({ ingredienteID: parseInt(req.params.id) }); // Cambiado a findOneBy
            if (!ingrediente) {
                return res.status(404).json({ message: "Ingrediente no encontrado" });
            }
            res.status(200).json(ingrediente);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const ingredienteRepo = AppDataSource.getRepository(IngredienteSchema);
            const ingrediente = await ingredienteRepo.findOneBy({ ingredienteID: parseInt(req.params.id) }); // Cambiado a findOneBy
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

    delete: async (req, res) => {
        try {
            const ingredienteRepo = AppDataSource.getRepository(IngredienteSchema);
            const ingrediente = await ingredienteRepo.findOneBy({ ingredienteID: parseInt(req.params.id) }); // Cambiado a findOneBy
            if (!ingrediente) {
                return res.status(404).json({ message: "Ingrediente no encontrado" });
            }
            await ingredienteRepo.remove(ingrediente);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default ingredienteController;
