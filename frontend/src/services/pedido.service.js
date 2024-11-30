import axios from "./root.service.js";

export const getPedidos = () => {
    return axios.get(`/pedido`);
  };

export const createPedido = async (pedidoData) => {
    try {
        const response = await axios.post(`/pedido`, pedidoData);
        return response.data;
    } catch (error) {
        console.error("Error al crear pedido:", error.response?.data || error.message);
        throw new Error(error.response?.data || 'Error al crear pedido');
    }
};

export async function updatePedido(id, pedidoData) {
  try {
    const { data } = await axios.put(`/pedido/${id}`, pedidoData);
    return data;
  } catch (error) {
    console.error("Error al actualizar pedido", error);
    return null;
  }
}

export async function deletePedido(id) {
  try {
    const { data } = await axios.delete(`/pedido/${id}`);
    return data;
  } catch (error) {
    console.error("Error al eliminar pedido", error);
    return null;
  }
}
