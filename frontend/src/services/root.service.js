import axios from 'axios';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode'; // Importa jwtDecode

// Función para verificar si el token es válido
function isTokenValid(token) {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // El tiempo actual en segundos

        return decodedToken.exp > currentTime; // Verifica si el token no ha expirado
    } catch {
        return false; // El token no es válido
    }
}

const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api';

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
        const token = cookies.get('jwt-auth', { path: '/' });
        if (token && isTokenValid(token)) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // Si el token no es válido o ha expirado, redirige al login
            window.location.href = '/login';
        }
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) { // Si la respuesta es 401 (no autorizado)
            window.location.href = '/login'; // Redirige al login
        }
        return Promise.reject(error);
    }
);

export default instance;