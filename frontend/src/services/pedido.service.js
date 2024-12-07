import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getPedidos = () => {
    return axios.get(`${API_URL}/pedido`);
  };

export const createPedido = async (pedidoData) => {
    try {
        const response = await axios.post(`${API_URL}/pedido`, pedidoData);
        return response.data;
    } catch (error) {
        console.error("Error al crear pedido:", error.response?.data || error.message);
        throw new Error(error.response?.data || 'Error al crear pedido');
    }
};

export async function updatePedido(id, pedidoData) {
  try {
    const { data } = await axios.put(`${API_URL}/pedido/${id}`, pedidoData);
    return data;
  } catch (error) {
    console.error("Error al actualizar pedido", error);
    return null;
  }
}

export async function deletePedido(id) {
  try {
    const { data } = await axios.delete(`${API_URL}/pedido/${id}`);
    return data;
  } catch (error) {
    console.error("Error al eliminar pedido", error);
    return null;
  }
}