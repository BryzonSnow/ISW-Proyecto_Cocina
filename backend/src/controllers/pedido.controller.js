import { getRepository } from "typeorm";
import PedidoSchema from "../entity/pedido.entity.js";

// Obtener todos los pedidos
export const getPedido = async (req, res) => {
    try {
        const pedidos = await getRepository(PedidoSchema).find({ relations: ["cliente", "mesero"] });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los pedidos", error });
    }
};

// Obtener un pedido por ID
export const getPedidoById = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await getRepository(PedidoSchema).findOne(id, { relations: ["cliente", "mesero"] });
        if (!pedido) return res.status(404).json({ message: "Pedido no encontrado" });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el pedido", error });
    }
};

// Crear un nuevo pedido
export const createPedido = async (req, res) => {
    const { Fecha, Estado, Total, cliente, mesero } = req.body;
    try {
        const nuevoPedido = getRepository(PedidoSchema).create({ Fecha, Estado, Total, cliente, mesero });
        const resultado = await getRepository(PedidoSchema).save(nuevoPedido);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el pedido", error });
    }
};

// Actualizar un pedido existente
export const updatePedido = async (req, res) => {
    const { id } = req.params;
    const { Fecha, Estado, Total, cliente, mesero } = req.body;
    try {
        const pedidoExistente = await getRepository(PedidoSchema).findOne(id);
        if (!pedidoExistente) return res.status(404).json({ message: "Pedido no encontrado" });

        getRepository(PedidoSchema).merge(pedidoExistente, { Fecha, Estado, Total, cliente, mesero });
        const resultado = await getRepository(PedidoSchema).save(pedidoExistente);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el pedido", error });
    }
};

// Eliminar un pedido
export const deletePedido = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await getRepository(PedidoSchema).delete(id);
        if (resultado.affected === 0) return res.status(404).json({ message: "Pedido no encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el pedido", error });
    }
};
