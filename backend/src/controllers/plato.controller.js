"use strict";
import { AppDataSource } from "../config/configDb.js"; 
import PlatoSchema from "../entity/Plato.entity.js"; 

const platoController = {
    create: async (req, res) => {
        try {
            const platoRepo = AppDataSource.getRepository(PlatoSchema);
            const nuevoPlato = platoRepo.create(req.body);
            const result = await platoRepo.save(nuevoPlato);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const platoRepo = AppDataSource.getRepository(PlatoSchema);
            const platos = await platoRepo.find();
            res.status(200).json(platos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const platoRepo = AppDataSource.getRepository(PlatoSchema);
            const plato = await platoRepo.findOneBy({ platoID: parseInt(req.params.id) }); // Cambiado a platoID
            if (!plato) {
                return res.status(404).json({ message: "Plato no encontrado" });
            }
            res.status(200).json(plato);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const platoRepo = AppDataSource.getRepository(PlatoSchema);
            const plato = await platoRepo.findOneBy({ platoID: parseInt(req.params.id) }); // Cambiado a platoID
            if (!plato) {
                return res.status(404).json({ message: "Plato no encontrado" });
            }
            platoRepo.merge(plato, req.body);
            const result = await platoRepo.save(plato);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const platoRepo = AppDataSource.getRepository(PlatoSchema);
            const plato = await platoRepo.findOneBy({ platoID: parseInt(req.params.id) }); // Cambiado a platoID
            if (!plato) {
                return res.status(404).json({ message: "Plato no encontrado" });
            }
            await platoRepo.remove(plato);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default platoController;
