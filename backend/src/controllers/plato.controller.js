import { getRepository } from "typeorm";
import PlatoSchema from "../entity/plato.entity.js";

// Obtener todos los platos
export const getPlatos = async (req, res) => {
    try {
        const platos = await getRepository(PlatoSchema).find({ relations: ["inventario", "menu"] });
        res.json(platos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los platos", error });
    }
};

// Obtener un plato por ID
export const getPlato = async (req, res) => {
    const { id } = req.params;
    try {
        const plato = await getRepository(PlatoSchema).findOne(id, { relations: ["inventario", "menu"] });
        if (!plato) return res.status(404).json({ message: "Plato no encontrado" });
        res.json(plato);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el plato", error });
    }
};

// Crear un nuevo plato
export const createPlato = async (req, res) => {
    const { Nombre, Descripcion, Precio, Disponibilidad } = req.body;
    try {
        const nuevoPlato = getRepository(PlatoSchema).create({ Nombre, Descripcion, Precio, Disponibilidad });
        const resultado = await getRepository(PlatoSchema).save(nuevoPlato);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el plato", error });
    }
};

// Actualizar un plato existente
export const updatePlato = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Descripcion, Precio, Disponibilidad } = req.body;
    try {
        const platoExistente = await getRepository(PlatoSchema).findOne(id);
        if (!platoExistente) return res.status(404).json({ message: "Plato no encontrado" });

        getRepository(PlatoSchema).merge(platoExistente, { Nombre, Descripcion, Precio, Disponibilidad });
        const resultado = await getRepository(PlatoSchema).save(platoExistente);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el plato", error });
    }
};

// Eliminar un plato
export const deletePlato = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await getRepository(PlatoSchema).delete(id);
        if (resultado.affected === 0) return res.status(404).json({ message: "Plato no encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el plato", error });
    }
};
