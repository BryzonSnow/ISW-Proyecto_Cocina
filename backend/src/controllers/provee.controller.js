import { getRepository } from "typeorm";
import ProveeSchema from "../entity/provee.entity.js";

// Obtener todos los registros de Provee
export const getProvee = async (req, res) => {
    try {
        const provees = await getRepository(ProveeSchema).find({ relations: ["proveedor", "ingrediente"] });
        res.json(provees);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los registros de Provee", error });
    }
};

// Obtener un registro de Provee por ID
export const getProveeById = async (req, res) => {
    const { id } = req.params;
    try {
        const provee = await getRepository(ProveeSchema).findOne(id, { relations: ["proveedor", "ingrediente"] });
        if (!provee) return res.status(404).json({ message: "Registro de Provee no encontrado" });
        res.json(provee);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el registro de Provee", error });
    }
};

// Crear un nuevo registro de Provee
export const createProvee = async (req, res) => {
    const { proveedor, ingrediente } = req.body;
    try {
        const nuevoProvee = getRepository(ProveeSchema).create({ proveedor, ingrediente });
        const resultado = await getRepository(ProveeSchema).save(nuevoProvee);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el registro de Provee", error });
    }
};

// Actualizar un registro de Provee existente
export const updateProvee = async (req, res) => {
    const { id } = req.params;
    const { proveedor, ingrediente } = req.body;
    try {
        const proveeExistente = await getRepository(ProveeSchema).findOne(id);
        if (!proveeExistente) return res.status(404).json({ message: "Registro de Provee no encontrado" });

        getRepository(ProveeSchema).merge(proveeExistente, { proveedor, ingrediente });
        const resultado = await getRepository(ProveeSchema).save(proveeExistente);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el registro de Provee", error });
    }
};

// Eliminar un registro de Provee
export const deleteProvee = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await getRepository(ProveeSchema).delete(id);
        if (resultado.affected === 0) return res.status(404).json({ message: "Registro de Provee no encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el registro de Provee", error });
    }
};
