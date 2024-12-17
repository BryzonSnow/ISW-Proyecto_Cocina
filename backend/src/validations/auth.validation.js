"use strict";
import Joi from "joi";

// Validador personalizado para el dominio del correo electrónico
const domainEmailValidator = (value, helper) => {
  // Permite varios dominios de correo electrónico si es necesario
  const validDomains = ["gmail.com", "hotmail.com", "yahoo.com"]; // Agrega otros dominios válidos si es necesario
  const emailDomain = value.split("@")[1];

  if (!validDomains.includes(emailDomain)) {
    return helper.message(`El correo electrónico debe ser de uno de los siguientes dominios: ${validDomains.join(", ")}`);
  }
  return value;
};

// Función para validar el RUT chileno, considerando el dígito verificador
const validateRUT = (rut) => {
  // Eliminar puntos y guión
  rut = rut.replace(/[.]/g, "").replace(/[-]/g, "");

  const body = rut.slice(0, -1); // Cuerpo del RUT (sin el DV)
  const dv = rut[rut.length - 1]; // Dígito verificador
  let sum = 0;
  let multiplier = 2;

  // Realizar la operación para calcular el DV
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const mod = sum % 11;
  const calculatedDV = mod === 0 ? "0" : mod === 1 ? "K" : (11 - mod).toString();

  if (calculatedDV !== dv.toUpperCase()) {
    throw new Error("El dígito verificador del RUT es incorrecto.");
  }

  return rut; // RUT válido
};

// Validación para el inicio de sesión (Login)
export const authValidation = Joi.object({
  email: Joi.string()
    .min(15)
    .max(35)
    .email()
    .required()
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "any.required": "El correo electrónico es obligatorio.",
      "string.base": "El correo electrónico debe ser de tipo texto.",
      "string.email": "El correo electrónico debe ser válido.",
      "string.min": "El correo electrónico debe tener al menos 15 caracteres.",
      "string.max": "El correo electrónico debe tener como máximo 35 caracteres.",
    })
    .custom(domainEmailValidator, "Validación dominio email"),
  password: Joi.string()
    .min(8)
    .max(26)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatoria.",
      "string.base": "La contraseña debe ser de tipo texto.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
      "string.pattern.base": "La contraseña solo puede contener letras y números.",
    }),
}).unknown(false).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

// Validación para el registro de un nuevo empleado
export const registerValidation = Joi.object({
  nombre: Joi.string()
    .min(15)
    .max(50)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required()
    .messages({
      "string.empty": "El nombre completo no puede estar vacío.",
      "any.required": "El nombre completo es obligatorio.",
      "string.base": "El nombre completo debe ser de tipo texto.",
      "string.min": "El nombre completo debe tener al menos 15 caracteres.",
      "string.max": "El nombre completo debe tener como máximo 50 caracteres.",
      "string.pattern.base": "El nombre completo solo puede contener letras y espacios.",
    }),
  rut: Joi.string()
    .min(9)
    .max(12)
    .required()
    .pattern(/^\d{1,2}\.?\d{3}\.?\d{3}[-]?[0-9kK]{1}$/) // Expresión regular mejorada para permitir puntos y guión
    .custom(validateRUT, "Validación RUT")
    .messages({
      "string.pattern.base": "Formato RUT inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
  email: Joi.string()
    .min(15)
    .max(35)
    .email()
    .required()
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "any.required": "El correo electrónico es obligatorio.",
      "string.base": "El correo electrónico debe ser de tipo texto.",
      "string.email": "El correo electrónico debe ser válido.",
      "string.min": "El correo electrónico debe tener al menos 15 caracteres.",
      "string.max": "El correo electrónico debe tener como máximo 35 caracteres.",
    })
    .custom(domainEmailValidator, "Validación dominio email"),
  password: Joi.string()
    .min(8)
    .max(26)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatorio.",
      "string.base": "La contraseña debe ser de tipo texto.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
      "string.pattern.base": "La contraseña solo puede contener letras y números.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });