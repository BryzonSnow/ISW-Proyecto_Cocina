"use strict";
import bcrypt from "bcryptjs";

// Encriptar una contraseña
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
