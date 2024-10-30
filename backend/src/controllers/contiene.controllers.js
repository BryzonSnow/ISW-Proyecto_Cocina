import { getRepository } from "typeorm";
import ContieneSchema from "../entity/contiene.entity.js";

// Obtener todas las relaciones "contiene"
export const getContiene = async (req, res) => {
    try {
        const contiene = await getRepository(ContieneSchema).find();
        res.json(contiene);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las relaciones 'contiene'", error });
    }
};

// Obtener una relación "contiene" por ID (PedidoID y PlatoID)
export const getContieneById = async (req, res) => {
    const { pedidoId, platoId } = req.params;
    try {
        const contiene = await getRepository(ContieneSchema).findOne({ where: { pedido: { id: pedidoId }, plato: { id: platoId } } });
        if (!contiene) return res.status(404).json({ message: "Relación 'contiene' no encontrada" });
        res.json(contiene);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la relación 'contiene'", error });
    }
};

// Crear una nueva relación "contiene"
export const createContiene = async (req, res) => {
    const { pedido, plato } = req.body;
    try {
        const nuevaRelacion = getRepository(ContieneSchema).create({ pedido, plato });
        const resultado = await getRepository(ContieneSchema).save(nuevaRelacion);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la relación 'contiene'", error });
    }
};

// Actualizar una relación "contiene" existente
export const updateContiene = async (req, res) => {
    const { pedidoId, platoId } = req.params;
    const { pedido, plato } = req.body;
    try {
        const relacionExistente = await getRepository(ContieneSchema).findOne({ where: { pedido: { id: pedidoId }, plato: { id: platoId } } });
        if (!relacionExistente) return res.status(404).json({ message: "Relación 'contiene' no encontrada" });

        getRepository(ContieneSchema).merge(relacionExistente, { pedido, plato });
        const resultado = await getRepository(ContieneSchema).save(relacionExistente);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la relación 'contiene'", error });
    }
};

// Eliminar una relación "contiene"
export const deleteContiene = async (req, res) => {
    const { pedidoId, platoId } = req.params;
    try {
        const resultado = await getRepository(ContieneSchema).delete({ pedido: { id: pedidoId }, plato: { id: platoId } });
        if (resultado.affected === 0) return res.status(404).json({ message: "Relación 'contiene' no encontrada" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la relación 'contiene'", error });
    }
};
