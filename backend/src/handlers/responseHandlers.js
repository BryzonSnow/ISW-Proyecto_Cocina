"use strict";

/**
 * Responde con un mensaje de éxito.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {number} statusCode - El código de estado HTTP.
 * @param {string} message - El mensaje que describe la respuesta.
 * @param {Object} [data={}] - Datos adicionales que se incluyen en la respuesta.
 * @returns {Object} La respuesta JSON con los datos.
 */
export function handleSuccess(res, statusCode, message, data = {}) {
  return res.status(statusCode).json({
    status: "Success",
    message,
    data,
  });
}

/**
 * Responde con un mensaje de error de cliente (errores en la entrada o validación).
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {number} statusCode - El código de estado HTTP.
 * @param {string} message - El mensaje que describe el error.
 * @param {Object} [details={}] - Detalles adicionales sobre el error (como campos no válidos).
 * @returns {Object} La respuesta JSON con el error.
 */
export function handleErrorClient(res, statusCode, message, details = {}) {
  return res.status(statusCode).json({
    status: "Client error",
    message,
    details,
  });
}

/**
 * Responde con un mensaje de error de servidor (errores internos del servidor).
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {number} statusCode - El código de estado HTTP.
 * @param {string} message - El mensaje que describe el error del servidor.
 * @returns {Object} La respuesta JSON con el error.
 */
export function handleErrorServer(res, statusCode, message) {
  return res.status(statusCode).json({
    status: "Server error",
    message,
  });
}
