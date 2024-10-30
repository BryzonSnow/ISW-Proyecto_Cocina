import { getRepository } from "typeorm";
import TurnoSchema from "../entity/turno.entity.js";

// Obtener todos los turnos
export const getTurnos = async (req, res) => {
    try {
        const turnos = await getRepository(TurnoSchema).find({ relations: ["administrador"] });
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los turnos", error });
    }
};

// Obtener un turno por ID
export const getTurno = async (req, res) => {
    const { id } = req.params;
    try {
        const turno = await getRepository(TurnoSchema).findOne(id, { relations: ["administrador"] });
        if (!turno) return res.status(404).json({ message: "Turno no encontrado" });
        res.json(turno);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el turno", error });
    }
};

// Crear un nuevo turno
export const createTurno = async (req, res) => {
    const { Fecha, HoraInicio, HoraFin } = req.body;
    try {
        const nuevoTurno = getRepository(TurnoSchema).create({ Fecha, HoraInicio, HoraFin });
        const resultado = await getRepository(TurnoSchema).save(nuevoTurno);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el turno", error });
    }
};

// Actualizar un turno existente
export const updateTurno = async (req, res) => {
    const { id } = req.params;
    const { Fecha, HoraInicio, HoraFin } = req.body;
    try {
        const turnoExistente = await getRepository(TurnoSchema).findOne(id);
        if (!turnoExistente) return res.status(404).json({ message: "Turno no encontrado" });

        getRepository(TurnoSchema).merge(turnoExistente, { Fecha, HoraInicio, HoraFin });
        const resultado = await getRepository(TurnoSchema).save(turnoExistente);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el turno", error });
    }
};

// Eliminar un turno
export const deleteTurno = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await getRepository(TurnoSchema).delete(id);
        if (resultado.affected === 0) return res.status(404).json({ message: "Turno no encontrado" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el turno", error });
    }
};
