import axios from "axios";
axios.defaults.baseURL = 'http://localhost:<puerto>'; // Cambia el puerto si es necesario

export async function getPedidos() {
    try {
        const { data } = await axios.get('/pedido/');
        return data;
    } catch (error) {
        return error.response?.data || { message: 'Error al obtener pedidos', status: 500 };
    }
}

export async function getPedidoById(id) {
    try {
        const { data } = await axios.get(`/pedido/${id}`);
        return data;
    } catch (error) {
        return error.response?.data || { message: 'Error al obtener pedido:', status: 500 };
    }
}

export async function createPedido(pedidoData) {
    try {
        const { data } = await axios.post('/pedido/', pedidoData);
        return data; // Ajusta según la estructura de tu respuesta del backend
    } catch (error) {
        return error.response?.data || { message: 'Error creating pedido', status: 500 };
    }
}

export async function updatePedido(id, pedidoData) {
    try {
        const { data } = await axios.put(`/pedido/${id}`, pedidoData);
        return data;
    } catch (error) {
        return error.response?.data || { message: 'Error al actualizar pedido', status: 500 };
    }
}
