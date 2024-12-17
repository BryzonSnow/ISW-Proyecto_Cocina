"use strict";
import Joi from "joi";
import Proveedor from "../entity/Proveedor.entity.js";

// Esquema de validación para el cuerpo (body) de las solicitudes
const proveedorBodyValidation = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            "string.base": "El nombre debe ser una cadena de caracteres",
            "string.min": "El nombre debe tener al menos 3 caracteres",
            "string.max": "El nombre no puede tener más de 255 caracteres",
            "any.required": "El nombre es obligatorio",
        }),
    direccion: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            "string.base": "La dirección debe ser una cadena de caracteres",
            "string.min": "La dirección debe tener al menos 3 caracteres",
            "string.max": "La dirección no puede tener más de 255 caracteres",
            "any.required": "La dirección es obligatoria",
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.base": "El correo electrónico debe ser una cadena de caracteres",
            "string.email": "El correo electrónico debe ser válido",
            "any.required": "El correo electrónico es obligatorio",
        })
});

// Esquema de validación para los parámetros de consulta (query)
const proveedorQueryValidation = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(255)
        .optional()
        .messages({
            "string.base": "El nombre debe ser una cadena de caracteres",
            "string.min": "El nombre debe tener al menos 3 caracteres",
            "string.max": "El nombre no puede tener más de 255 caracteres",
        }),
    email: Joi.string()
        .email()
        .optional()
        .messages({
            "string.base": "El correo electrónico debe ser una cadena de caracteres",
            "string.email": "El correo electrónico debe ser válido",
        }),
    id: Joi.string()
        .uuid()
        .optional()
        .messages({
            "string.base": "El ID debe ser una cadena de caracteres",
            "string.guid": "El ID debe ser un UUID válido",
        }),
});

// Función para validar la unicidad del proveedor (nombre o correo)
const validateProviderUniqueness = async (nombre, email) => {
    try {
        // Verificar si existe un proveedor con el mismo nombre
        const existingByName = await Proveedor.findOne({
            where: { nombre }
        });
    
        // Si existe un proveedor con el mismo nombre, lanzar error específico
        if (existingByName) {
            throw new Error(`Ya existe un proveedor con el nombre "${nombre}".`);
        }
    
        // Verificar si existe un proveedor con el mismo correo
        const existingByEmail = await Proveedor.findOne({
            where: { email }
        });
    
        // Si existe un proveedor con el mismo correo, lanzar error específico
        if (existingByEmail) {
            throw new Error(`Ya existe un proveedor con el correo electrónico "${email}".`);
        }
    } catch (error) {
        // Manejo de errores
        throw new Error(`Error al verificar la unicidad del proveedor: ${error.message}`);
    }
};

export {
    proveedorBodyValidation,
    proveedorQueryValidation,
    validateProviderUniqueness,
};