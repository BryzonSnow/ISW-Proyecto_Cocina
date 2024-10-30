import { getRepository } from "typeorm";
import MeseroSchema from "../entity/mesero.entity.js";

// Obtener todos los meseros
export const getMesero = async (req, res) => {
    try {
        const meseros = await getRepository(MeseroSchema).find({ relations: ["empleado"] });
        res.json(meseros);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los meseros", error });
    }
};

// Obtener un mesero por ID
export const getMeseroById = async (req, res) => {
    const { id } = req.params;
    try {
        const mesero = await getRepository(MeseroSchema).findOne(id, { relations: ["empleado"] });
        if (!mesero) return res.status(404).json({ message: "Mesero no encontrado" });
        res.json(mesero);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el mesero", error });
    }
};

// Crear un nuevo mesero
export const createMesero = async (req, res) => {
    const { empleado } = req.body;
    try {
        const nuevoMesero = getRepository(MeseroSchema).create({ empleado });
        const resultado = await getRepository(MeseroSchema).save(nuevoMesero);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el mesero", error });
    }
};

// Actualizar un mesero existente
export const updateMesero = async (req, res) => {
    const { id } = req.params;
    const { empleado } = req.body;
    try {
        const meseroExistente = await getRepository(MeseroSchema).findOne(id);
        if (!meseroExistente) return res.status(404).json({ message: "Mesero no encontrado" });

        getRepository(MeseroSchema).merge(meseroExistente, { empleado });
        const resultado = await getRepository(MeseroSchema).save(meseroExistente);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el mesero", error });
    }
};

// Eliminar un mesero
export const deleteMesero = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await getRepository(MeseroSchema).delete(id);
        if (resultado.affected === 0) return res.status(404).json({ message: "Mesero no encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el mesero", error });
    }
};
