import { getRepository } from "typeorm";
import Menu from "../entity/menu.entity.js"; // Asegúrate de que esto sea correcto

export const getMenus = async (req, res) => {
    try {
        const menus = await getRepository(Menu).find();
        res.json(menus);
    } catch (error) {
        console.error(error); // Para depuración
        res.status(500).json({ message: "Error al obtener los menús" }); // Mensaje genérico
    }
};

export const getMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await getRepository(Menu).findOne(id);
        if (menu) {
            res.json(menu);
        } else {
            res.status(404).json({ message: "Menú no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el menú" });
    }
};

export const createMenu = async (req, res) => {
    try {
        const newMenu = getRepository(Menu).create(req.body);
        const result = await getRepository(Menu).save(newMenu);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el menú" });
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
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el menú" });
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
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el menú" });
    }
};
