import validator from 'validator'; // Usamos la librería validator para la validación de email
import { validarRUT } from '/rutValidator'; // Importa la función para validar el RUT

// Validación de correo electrónico
function validarCorreo(email) {
  return validator.isEmail(email);  // Valida que el correo tenga un formato válido
}

// Validación de contraseña
function validarContraseña(password) {
  // Validación que la contraseña tenga al menos 8 caracteres, una mayúscula, una minúscula y un número
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

// Función para validar todo el formulario
export function validarFormulario(data) {
    const errores = {};

    if (!validarCorreo(data.email)) {
        errores.email = "El correo electrónico ingresado no es válido";
    }

    if (!validarRUT(data.rut)) {
        errores.rut = "El RUT ingresado no es válido";
    }

    if (!validarContraseña(data.password)) {
        errores.password = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número";
    }

    return errores;
}
