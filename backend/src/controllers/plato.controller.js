"use strict";
import { AppDataSource } from "../config/configDb.js"; 
import PlatoSchema from "../entity/Plato.entity.js"; 
import IngredienteSchema from "../entity/Ingrediente.entity.js";
import PlatoIngredienteSchema from "../entity/ingredientes_plato.entity.js";

const platoController = {
    create: async (req, res) => {
        try {
            const platoRepo = AppDataSource.getRepository(PlatoSchema);
            const platoIngredienteRepo = AppDataSource.getRepository(PlatoIngredienteSchema);
    
            console.log("Datos en req.body (create):", req.body);
    
            const { nombre, descripcion, precio, disponibilidad, ingredienteID } = req.body;
    
            // Validar datos obligatorios
            if (!nombre || !descripcion || !precio || disponibilidad === undefined) {
                return res.status(400).json({ message: "Todos los campos son obligatorios." });
            }
    
            // Validar que haya al menos un ingrediente con cantidad
            if (!ingredienteID || ingredienteID.length === 0) {
                return res.status(400).json({ message: "Debes seleccionar al menos un ingrediente." });
            }
    
            // Crear el nuevo plato
            const nuevoPlato = await platoRepo.save({
                nombre,
                descripcion,
                precio,
                disponibilidad,
            });
            console.log("Plato creado:", nuevoPlato);
    
            // Guardar relaciones con ingredientes y cantidades
            for (const { ingredienteID: id, cantidad } of ingredienteID) {
                console.log("Guardando relación plato-ingrediente con cantidad:", {
                    platoID: nuevoPlato.platoID,
                    ingredienteID: id,
                    cantidad,
                });
    
                await platoIngredienteRepo.save({
                    platoID: nuevoPlato.platoID,
                    ingredienteID: id,
                    cantidad,
                });
            }
    
            res.status(201).json(nuevoPlato);
        } catch (error) {
            console.error("Error al crear el plato:", error);
            res.status(500).json({ message: error.message });
        }
    },    

    getAll: async (req, res) => {
        try {
            const platoRepo = AppDataSource.getRepository(PlatoSchema);
            const platoIngredienteRepo = AppDataSource.getRepository(PlatoIngredienteSchema);
            const ingredienteRepo = AppDataSource.getRepository(IngredienteSchema);
    
            const response = [];
            const platos = await platoRepo.find();
    
            for (const plato of platos) {
                // Obtener los ingredientes relacionados con este plato
                const ingredientes = await platoIngredienteRepo.find({
                    where: { platoID: plato.platoID },
                });
    
                let ingredientesData = [];
                for (const ingrediente of ingredientes) {
                    // Obtener el nombre del ingrediente desde la tabla de ingredientes
                    const ingredienteData = await ingredienteRepo.findOne({
                        where: { ingredienteID: ingrediente.ingredienteID },
                        select: { nombre: true }, // Solo traer el nombre
                    });
    
                    // Agregar ingrediente con su cantidad a la lista
                    ingredientesData.push({
                        ingredienteID: ingrediente.ingredienteID,
                        nombre: ingredienteData.nombre,
                        cantidad: ingrediente.cantidad, // Agregar la cantidad
                    });
                }
    
                // Agregar el plato con sus ingredientes al resultado final
                response.push({
                    platoID: plato.platoID,
                    nombre: plato.nombre,
                    descripcion: plato.descripcion,
                    precio: plato.precio,
                    disponibilidad: plato.disponibilidad,
                    ingredientes: ingredientesData, // Cambiado a un nombre más claro
                });
            }
    
            res.status(200).json(response);
        } catch (error) {
            console.error("Error en getAll:", error.message);
            res.status(500).json({ message: error.message });
        }
    },
    

    getById: async (req, res) => {
        try {
            const platoRepo = AppDataSource.getRepository(PlatoSchema);
            const plato = await platoRepo.findOneBy({ platoID: parseInt(req.params.id) }); // Cambiado a platoID
            if (!plato) {
                return res.status(404).json({ message: "Plato no encontrado" });
            }
            res.status(200).json(plato);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const platoRepo = AppDataSource.getRepository(PlatoSchema);
            const platoIngredienteRepo = AppDataSource.getRepository(PlatoIngredienteSchema);
    
            console.log("Datos recibidos para actualizar plato:", req.body);
    
            const { nombre, descripcion, precio, disponibilidad, ingredienteID } = req.body;
    
            // Buscar el plato por ID
            const plato = await platoRepo.findOne({
                where: { platoID: parseInt(req.params.id) },
            });
    
            if (!plato) {
                return res.status(404).json({ message: "Plato no encontrado" });
            }
    
            // Actualizar los campos del plato
            if (nombre !== undefined) plato.nombre = nombre;
            if (descripcion !== undefined) plato.descripcion = descripcion;
            if (precio !== undefined) plato.precio = precio;
            if (disponibilidad !== undefined) plato.disponibilidad = disponibilidad;
    
            // Eliminar relaciones antiguas de plato-ingrediente
            await platoIngredienteRepo.delete({ platoID: plato.platoID });
            console.log("Relaciones antiguas eliminadas para platoID:", plato.platoID);
    
            // Insertar nuevas relaciones con cantidades
            for (const { ingredienteID: id, cantidad } of ingredienteID) {
                console.log("Guardando nueva relación plato-ingrediente con cantidad:", {
                    platoID: plato.platoID,
                    ingredienteID: id,
                    cantidad,
                });
    
                await platoIngredienteRepo.save({
                    platoID: plato.platoID,
                    ingredienteID: id,
                    cantidad,
                });
            }
    
            // Guardar el plato actualizado
            const result = await platoRepo.save(plato);
            res.status(200).json(result);
        } catch (error) {
            console.error("Error al actualizar plato:", error);
            res.status(500).json({ message: error.message });
        }
    },
    
    

    delete: async (req, res) => {
        try {
            const platoRepo = AppDataSource.getRepository(PlatoSchema);
            const plato = await platoRepo.findOneBy({ platoID: parseInt(req.params.id) }); // Cambiado a platoID
            if (!plato) {
                return res.status(404).json({ message: "Plato no encontrado" });
            }
            await platoRepo.remove(plato);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default platoController;