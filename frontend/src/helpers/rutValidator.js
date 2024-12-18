export function validarRUT(rut) {
    const regex = /^\d{1,2}(\.\d{3}){2}-[0-9Kk]$/; // Expresión regular para validar la estructura del RUT
    if (!regex.test(rut)) {
        return false;
    }
    // Verificación del dígito verificador (usando un algoritmo común en Chile)
    const rutNumerico = rut.replace(/[^\dKk]/g, '').toUpperCase();
    const rutBase = rutNumerico.slice(0, -1);
    const digitoVerificador = rutNumerico.slice(-1);
    let suma = 0;
    let multiplo = 2;

    for (let i = rutBase.length - 1; i >= 0; i--) {
        suma += parseInt(rutBase.charAt(i)) * multiplo;
        multiplo = (multiplo === 7) ? 2 : multiplo + 1;
    }

    const resto = suma % 11;
    const dvCalculado = (11 - resto) === 10 ? 'K' : (11 - resto) === 11 ? '0' : (11 - resto).toString();

    return digitoVerificador === dvCalculado;
}