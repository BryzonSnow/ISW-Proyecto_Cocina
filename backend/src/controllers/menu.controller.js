import { getRepository } from "typeorm";
import Menu from "../entities/menu.entity";

export const getMenus = async (req, res) => {
    try {
        const menus = await getRepository(Menu).find();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMenuById = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await getRepository(Menu).findOne(id);
        if (menu) {
            res.json(menu);
        } else {
            res.status(404).json({ message: "Menú no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createMenu = async (req, res) => {
    try {
        const newMenu = getRepository(Menu).create(req.body);
        const result = await getRepository(Menu).save(newMenu);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await getRepository(Menu).findOne(id);
        if (menu) {
            getRepository(Menu).merge(menu, req.body);
            const result = await getRepository(Menu).save(menu);
            res.json(result);
        } else {
            res.status(404).json({ message: "Menú no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getRepository(Menu).delete(id);
        if (result.affected) {
            res.json({ message: "Menú eliminado" });
        } else {
            res.status(404).json({ message: "Menú no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};