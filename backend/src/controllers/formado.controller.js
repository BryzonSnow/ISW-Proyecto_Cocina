import { getRepository } from "typeorm";
import FormadoSchema from "../entity/formado.entity.js";

// Obtener todas las relaciones "formado"
export const getFormado = async (req, res) => {
    try {
        const formados = await getRepository(FormadoSchema).find();
        res.json(formados);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las relaciones 'formado'", error });
    }
};

// Obtener una relación "formado" por ID (PlatoID e IngredienteID)
export const getFormadoById = async (req, res) => {
    const { platoId, ingredienteId } = req.params;
    try {
        const formado = await getRepository(FormadoSchema).findOne({ where: { plato: { id: platoId }, ingrediente: { id: ingredienteId } } });
        if (!formado) return res.status(404).json({ message: "Relación 'formado' no encontrada" });
        res.json(formado);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la relación 'formado'", error });
    }
};

// Crear una nueva relación "formado"
export const createFormado = async (req, res) => {
    const { plato, ingrediente } = req.body;
    try {
        const nuevaRelacion = getRepository(FormadoSchema).create({ plato, ingrediente });
        const resultado = await getRepository(FormadoSchema).save(nuevaRelacion);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la relación 'formado'", error });
    }
};

// Actualizar una relación "formado" existente
export const updateFormado = async (req, res) => {
    const { platoId, ingredienteId } = req.params;
    const { plato, ingrediente } = req.body;
    try {
        const relacionExistente = await getRepository(FormadoSchema).findOne({ where: { plato: { id: platoId }, ingrediente: { id: ingredienteId } } });
        if (!relacionExistente) return res.status(404).json({ message: "Relación 'formado' no encontrada" });

        getRepository(FormadoSchema).merge(relacionExistente, { plato, ingrediente });
        const resultado = await getRepository(FormadoSchema).save(relacionExistente);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la relación 'formado'", error });
    }
};

// Eliminar una relación "formado"
export const deleteFormado = async (req, res) => {
    const { platoId, ingredienteId } = req.params;
    try {
        const resultado = await getRepository(FormadoSchema).delete({ plato: { id: platoId }, ingrediente: { id: ingredienteId } });
        if (resultado.affected === 0) return res.status(404).json({ message: "Relación 'formado' no encontrada" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la relación 'formado'", error });
    }
};
