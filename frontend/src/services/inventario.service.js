import axios from "axios";

export async function getInventarios() {
    try {
        const { data } = await axios.get('/inventario/');
        return data;
    }catch (error) {
        return error.response?.data || { message: 'Error al obtener inventarios', status: 500 };
    }
}

export async function getInventarioById(id) {
    try {
        const { data } = await axios.get(`/inventario/${id}`);
        return data;
    }catch (error) {
        return error.response?.data || { message: 'Error al obtener inventario:', status: 500 };
    }
}

export async function createInventario(inventarioData) {
    try {
        const { data } = await axios.post('/inventario/', inventarioData);
        return data; // Ajusta según la estructura de tu respuesta del backend
    }catch (error) {
        return error.response?.data || { message: 'Error al crear inventario', status: 500 };
    }
}

export async function updateInventario(id, inventarioData) {
    try {
        const { data } = await axios.put(`/inventario/${id}`, inventarioData);
        return data;
    }catch (error) {
        return error.response?.data || { message: 'Error al actualizar inventario', status: 500 };
    }
}

export async function deleteInventario(id) {
    try {
        const { data } = await axios.delete(`/inventario/${id}`);
        return data;
    }catch (error) {
        return error.response?.data || { message: 'Error al eliminar inventario', status: 500 };
    }
}