import { getRepository } from "typeorm";
import ProveedorSchema from "../entity/proveedor.entity.js";

// Obtener todos los proveedores
export const getProveedor = async (req, res) => {
    try {
        const proveedores = await getRepository(ProveedorSchema).find({ relations: ["administrador"] });
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los proveedores", error });
    }
};

// Obtener un proveedor por ID
export const getProveedorById = async (req, res) => {
    const { id } = req.params;
    try {
        const proveedor = await getRepository(ProveedorSchema).findOne(id, { relations: ["administrador"] });
        if (!proveedor) return res.status(404).json({ message: "Proveedor no encontrado" });
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el proveedor", error });
    }
};

// Crear un nuevo proveedor
export const createProveedor = async (req, res) => {
    const { Nombre, Contacto, Direccion } = req.body;
    try {
        const nuevoProveedor = getRepository(ProveedorSchema).create({ Nombre, Contacto, Direccion });
        const resultado = await getRepository(ProveedorSchema).save(nuevoProveedor);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el proveedor", error });
    }
};

// Actualizar un proveedor existente
export const updateProveedor = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Contacto, Direccion } = req.body;
    try {
        const proveedorExistente = await getRepository(ProveedorSchema).findOne(id);
        if (!proveedorExistente) return res.status(404).json({ message: "Proveedor no encontrado" });

        getRepository(ProveedorSchema).merge(proveedorExistente, { Nombre, Contacto, Direccion });
        const resultado = await getRepository(ProveedorSchema).save(proveedorExistente);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el proveedor", error });
    }
};

// Eliminar un proveedor
export const deleteProveedor = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await getRepository(ProveedorSchema).delete(id);
        if (resultado.affected === 0) return res.status(404).json({ message: "Proveedor no encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el proveedor", error });
    }
};
