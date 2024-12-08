"use strict";
import bcrypt from "bcryptjs";

/**
 * Encripta una contraseña utilizando bcryptjs.
 * @param {string} password - La contraseña a encriptar.
 * @returns {Promise<string>} La contraseña encriptada.
 */
export async function encryptPassword(password) {
  try {
    // Generar un "salt" para la encriptación
    const salt = await bcrypt.genSalt(10);
    // Encriptar la contraseña con el salt generado
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    // Manejo de errores si algo falla durante la encriptación
    throw new Error("Error al encriptar la contraseña");
  }
}

/**
 * Compara una contraseña recibida con la contraseña encriptada almacenada.
 * @param {string} password - La contraseña sin encriptar proporcionada por el usuario.
 * @param {string} receivedPassword - La contraseña encriptada almacenada en la base de datos.
 * @returns {Promise<boolean>} `true` si las contraseñas coinciden, `false` en caso contrario.
 */
export async function comparePassword(password, receivedPassword) {
  try {
    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, receivedPassword);
    return isMatch;
  } catch (error) {
    // Manejo de errores si la comparación falla
    throw new Error("Error al comparar las contraseñas");
  }
}
