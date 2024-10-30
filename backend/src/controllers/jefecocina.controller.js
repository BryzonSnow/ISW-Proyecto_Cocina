import { getRepository } from "typeorm";
import JefeCocinaSchema from "../entity/jefecocina.entity.js";

// Obtener todos los jefes de cocina
export const getJefesCocina = async (req, res) => {
    try {
        const jefesCocina = await getRepository(JefeCocinaSchema).find({ relations: ["inventario", "administrador", "chef"] });
        res.json(jefesCocina);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los jefes de cocina", error });
    }
};

// Obtener un jefe de cocina por ID
export const getJefeCocina = async (req, res) => {
    const { id } = req.params;
    try {
        const jefeCocina = await getRepository(JefeCocinaSchema).findOne(id, { relations: ["inventario", "administrador", "chef"] });
        if (!jefeCocina) return res.status(404).json({ message: "Jefe de cocina no encontrado" });
        res.json(jefeCocina);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el jefe de cocina", error });
    }
};

// Crear un nuevo jefe de cocina
export const createJefeCocina = async (req, res) => {
    const { PermisoInventario, FechaAsignacionRol, Estado, inventario, administrador, chef } = req.body;
    try {
        const nuevoJefeCocina = getRepository(JefeCocinaSchema).create({ PermisoInventario, FechaAsignacionRol, Estado, inventario, administrador, chef });
        const resultado = await getRepository(JefeCocinaSchema).save(nuevoJefeCocina);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el jefe de cocina", error });
    }
};

// Actualizar un jefe de cocina existente
export const updateJefeCocina = async (req, res) => {
    const { id } = req.params;
    const { PermisoInventario, FechaAsignacionRol, Estado, inventario, administrador, chef } = req.body;
    try {
        const jefeCocinaExistente = await getRepository(JefeCocinaSchema).findOne(id);
        if (!jefeCocinaExistente) return res.status(404).json({ message: "Jefe de cocina no encontrado" });

        getRepository(JefeCocinaSchema).merge(jefeCocinaExistente, { PermisoInventario, FechaAsignacionRol, Estado, inventario, administrador, chef });
        const resultado = await getRepository(JefeCocinaSchema).save(jefeCocinaExistente);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el jefe de cocina", error });
    }
};

// Eliminar un jefe de cocina
export const deleteJefeCocina = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await getRepository(JefeCocinaSchema).delete(id);
        if (resultado.affected === 0) return res.status(404).json({ message: "Jefe de cocina no encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el jefe de cocina", error });
    }
};
