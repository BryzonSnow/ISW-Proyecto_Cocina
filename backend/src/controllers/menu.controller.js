"use strict";
import { AppDataSource } from "../config/configDb.js"; 
import MenuSchema from "../entity/Menu.entity.js"; 

const menuController = {
    create: async (req, res) => {
        try {
            const menuRepo = AppDataSource.getRepository(MenuSchema);
            const nuevoMenu = menuRepo.create(req.body);
            const result = await menuRepo.save(nuevoMenu);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const menuRepo = AppDataSource.getRepository(MenuSchema);
            const menus = await menuRepo.find();
            res.status(200).json(menus);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const menuRepo = AppDataSource.getRepository(MenuSchema);
            const menu = await menuRepo.findOneBy({ menuID: parseInt(req.params.id) }); // Cambiado a findOneBy
            if (!menu) {
                return res.status(404).json({ message: "Menu no encontrado" });
            }
            res.status(200).json(menu);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const menuRepo = AppDataSource.getRepository(MenuSchema);
            const menu = await menuRepo.findOneBy({ menuID: parseInt(req.params.id) }); // Cambiado a findOneBy
            if (!menu) {
                return res.status(404).json({ message: "Menu no encontrado" });
            }
            menuRepo.merge(menu, req.body);
            const result = await menuRepo.save(menu);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const menuRepo = AppDataSource.getRepository(MenuSchema);
            const menu = await menuRepo.findOneBy({ menuID: parseInt(req.params.id) }); // Cambiado a findOneBy
            if (!menu) {
                return res.status(404).json({ message: "Menu no encontrado" });
            }
            await menuRepo.remove(menu);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default menuController;
