import { getRepository } from "typeorm";
import Inventario from "../entity/inventario.entity";

export const getInventarios = async (req, res) => {
    try {
        const inventarios = await getRepository(Inventario).find();
        res.json(inventarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInventarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const inventario = await getRepository(Inventario).findOne(id);
        if (inventario) {
            res.json(inventario);
        } else {
            res.status(404).json({ message: "Inventario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createInventario = async (req, res) => {
    try {
        const newInventario = getRepository(Inventario).create(req.body);
        const result = await getRepository(Inventario).save(newInventario);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateInventario = async (req, res) => {
    try {
        const { id } = req.params;
        const inventario = await getRepository(Inventario).findOne(id);
        if (inventario) {
            getRepository(Inventario).merge(inventario, req.body);
            const result = await getRepository(Inventario).save(inventario);
            res.json(result);
        } else {
            res.status(404).json({ message: "Inventario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteInventario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getRepository(Inventario).delete(id);
        if (result.affected) {
            res.json({ message: "Inventario eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Inventario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};