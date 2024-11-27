import axios from "axios";

export async function getCliente() {
    try {
        const { data } = await axios.get('/cliente/');
        return data;
    }catch (error) {
        return error.response?.data || { message: 'Error al obtener cliente', status: 500 };
    }
}

export async function getClienteById(id) {
    try {
        const { data } = await axios.get(`/cliente/${id}`);
        return data;
    }catch (error) {
        return error.response?.data || { message: 'Error al obtener cliente:', status: 500 };
    }
}

export async function createCliente(clienteData) {
    try {
        const { data } = await axios.post('/cliente/', clienteData);
        return data; // Ajusta según la estructura de tu respuesta del backend
    }catch (error) {
        return error.response?.data || { message: 'Error al crear cliente', status: 500 };
    }
}

export async function updateCliente(id, clienteData) {
    try {
        const { data } = await axios.put(`/cliente/${id}`, clienteData);
        return data;
    }catch (error) {
        return error.response?.data || { message: 'Error al actualizar cliente', status: 500 };
    }
}

export async function deleteCliente(id) {
    try {
        const { data } = await axios.delete(`/cliente/${id}`);
        return data;
    }catch (error) {
        return error.response?.data || { message: 'Error al eliminar cliente', status: 500 };
    }
}