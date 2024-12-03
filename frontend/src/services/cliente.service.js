import axios from "./root.service.js";

export async function getCliente() {
  try {
    const { data } = await axios.get(`/cliente/`);
    return data;
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return [];
  }
}

export async function createCliente(clienteData) {
  try {
    const { data } = await axios.post(`/cliente/`, clienteData);
    return data;
  } catch (error) {
    console.error("Error al crear cliente:", error);
    throw error;
  }
}

export async function updateCliente(id, clienteData) {
  try {
    const { data } = await axios.put(`/cliente/${id}`, clienteData);
    return data;
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    throw error;
  }
}
export async function deleteCliente(id) {
  try {
    await axios.delete(`/cliente/${id}`);
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    throw error;
  }
}