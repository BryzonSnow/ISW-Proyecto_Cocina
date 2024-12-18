import axios from './root.service.js';
import cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { convertirMinusculas } from '@helpers/formatData.js';
import { showErrorAlert } from '@helpers/sweetAlert.js';  // Importa la función de SweetAlert

// Función para verificar si el token es válido (no ha expirado)
function isTokenValid(token) {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // El tiempo actual en segundos
        return decodedToken.exp > currentTime; // Verifica si el token no ha expirado
    } catch {
        return false; // El token no es válido
    }
}

export async function login(dataUser) {
    try {
        const response = await axios.post('/auth/login', {
            email: dataUser.email, 
            password: dataUser.password
        });
        const { status, data } = response;
        if (status === 200) {
            const { nombreCompleto, email, rut, rol } = jwtDecode(data.data.token);
            const userData = { nombreCompleto, email, rut, rol };

            sessionStorage.setItem('usuario', JSON.stringify(userData));

            // Verificar si el token es válido
            if (isTokenValid(data.token)) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                cookies.set('jwt-auth', data.token, {
                    path: '/',
                    secure: true,    // Solo se enviará sobre HTTPS
                    httpOnly: true,  // No accesible desde JavaScript
                    sameSite: 'Strict'  // Previene ataques CSRF
                });
                return response.data;
            } else {
                showErrorAlert('Error de Autenticación', 'El token ha expirado o es inválido.');
                return { error: "Token expirado o inválido" };
            }
        }
    } catch (error) {
        showErrorAlert('Error de Inicio de Sesión', error.response?.data?.message || 'Error desconocido.');
        return error.response.data;
    }
}

export async function register(data) {
    try {
        const dataRegister = convertirMinusculas(data);
        const { nombreCompleto, email, rut, password } = dataRegister;
        const response = await axios.post('/auth/register', {
            nombreCompleto,
            email,
            rut,
            password
        });
        return response.data;
    } catch (error) {
        showErrorAlert('Error de Registro', error.response?.data?.message || 'Error desconocido.');
        return error.response.data;
    }
}

export async function logout() {
    try {
        await axios.post('/auth/logout');
        sessionStorage.removeItem('usuario');
        cookies.remove('jwt-auth', { path: '/' });  // Eliminar cookie
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}