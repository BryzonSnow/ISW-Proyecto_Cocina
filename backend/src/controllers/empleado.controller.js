import { getRepository } from "typeorm";
import EmpleadoSchema from "../entity/empleado.entity.js";

// Obtener todos los empleados
export const getEmpleados = async (req, res) => {
    try {
        const empleados = await getRepository(EmpleadoSchema).find({ relations: ["turno"] });
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los empleados", error });
    }
};

// Obtener un empleado por ID
export const getEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        const empleado = await getRepository(EmpleadoSchema).findOne(id, { relations: ["turno"] });
        if (!empleado) return res.status(404).json({ message: "Empleado no encontrado" });
        res.json(empleado);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el empleado", error });
    }
};

// Crear un nuevo empleado
export const createEmpleado = async (req, res) => {
    const { Nombre, Contacto, turno } = req.body;
    try {
        const nuevoEmpleado = getRepository(EmpleadoSchema).create({ Nombre, Contacto, turno });
        const resultado = await getRepository(EmpleadoSchema).save(nuevoEmpleado);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el empleado", error });
    }
};

// Actualizar un empleado existente
export const updateEmpleado = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Contacto, turno } = req.body;
    try {
        const empleadoExistente = await getRepository(EmpleadoSchema).findOne(id);
        if (!empleadoExistente) return res.status(404).json({ message: "Empleado no encontrado" });

        getRepository(EmpleadoSchema).merge(empleadoExistente, { Nombre, Contacto, turno });
        const resultado = await getRepository(EmpleadoSchema).save(empleadoExistente);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el empleado", error });
    }
};

// Eliminar un empleado
export const deleteEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await getRepository(EmpleadoSchema).delete(id);
        if (resultado.affected === 0) return res.status(404).json({ message: "Empleado no encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el empleado", error });
    }
};
