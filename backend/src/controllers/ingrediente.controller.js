import { getRepository } from "typeorm";
import IngredienteSchema from "../entity/ingrediente.entity.js";

// Obtener todos los ingredientes
export const getIngrediente = async (req, res) => {
    try {
        const ingredientes = await getRepository(IngredienteSchema).find({ relations: ["proveedor", "inventario"] });
        res.json(ingredientes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los ingredientes", error });
    }
};

// Obtener un ingrediente por ID
export const getIngredienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const ingrediente = await getRepository(IngredienteSchema).findOne(id, { relations: ["proveedor", "inventario"] });
        if (!ingrediente) return res.status(404).json({ message: "Ingrediente no encontrado" });
        res.json(ingrediente);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el ingrediente", error });
    }
};

// Crear un nuevo ingrediente
export const createIngrediente = async (req, res) => {
    const { Nombre, CantidadInventario, UnidadMedida, proveedor, inventario } = req.body;
    try {
        const nuevoIngrediente = getRepository(IngredienteSchema).create({ Nombre, CantidadInventario, UnidadMedida, proveedor, inventario });
        const resultado = await getRepository(IngredienteSchema).save(nuevoIngrediente);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el ingrediente", error });
    }
};

// Actualizar un ingrediente existente
export const updateIngrediente = async (req, res) => {
    const { id } = req.params;
    const { Nombre, CantidadInventario, UnidadMedida, proveedor, inventario } = req.body;
    try {
        const ingredienteExistente = await getRepository(IngredienteSchema).findOne(id);
        if (!ingredienteExistente) return res.status(404).json({ message: "Ingrediente no encontrado" });

        getRepository(IngredienteSchema).merge(ingredienteExistente, { Nombre, CantidadInventario, UnidadMedida, proveedor, inventario });
        const resultado = await getRepository(IngredienteSchema).save(ingredienteExistente);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el ingrediente", error });
    }
};

// Eliminar un ingrediente
export const deleteIngrediente = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await getRepository(IngredienteSchema).delete(id);
        if (resultado.affected === 0) return res.status(404).json({ message: "Ingrediente no encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el ingrediente", error });
    }
};
