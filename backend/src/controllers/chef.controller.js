import { getRepository } from "typeorm";
import ChefSchema from "../entity/chef.entity.js";

// Obtener todos los chefs
export const getChefs = async (req, res) => {
    try {
        const chefs = await getRepository(ChefSchema).find();
        res.json(chefs);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los chefs", error });
    }
};

// Obtener un chef por ID
export const getChef = async (req, res) => {
    const { id } = req.params;
    try {
        const chef = await getRepository(ChefSchema).findOne(id);
        if (!chef) return res.status(404).json({ message: "Chef no encontrado" });
        res.json(chef);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el chef", error });
    }
};

// Crear un nuevo chef
export const createChef = async (req, res) => {
    const { Especialidad, empleado } = req.body;
    try {
        const nuevoChef = getRepository(ChefSchema).create({ Especialidad, empleado });
        const resultado = await getRepository(ChefSchema).save(nuevoChef);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el chef", error });
    }
};

// Actualizar un chef existente
export const updateChef = async (req, res) => {
    const { id } = req.params;
    const { Especialidad, empleado } = req.body;
    try {
        const chefExistente = await getRepository(ChefSchema).findOne(id);
        if (!chefExistente) return res.status(404).json({ message: "Chef no encontrado" });

        getRepository(ChefSchema).merge(chefExistente, { Especialidad, empleado });
        const resultado = await getRepository(ChefSchema).save(chefExistente);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el chef", error });
    }
};

// Eliminar un chef
export const deleteChef = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await getRepository(ChefSchema).delete(id);
        if (resultado.affected === 0) return res.status(404).json({ message: "Chef no encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el chef", error });
    }
};
