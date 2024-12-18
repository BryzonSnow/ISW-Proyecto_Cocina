import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Asegúrate de que la URL esté correcta

export async function getEmpleado() {
  try {
    const { data } = await axios.get(`${API_URL}/empleado/`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error al obtener empleados", error);
    return [];
  }
}

export async function getEmpleadoById(id) {
  try {
    const { data } = await axios.get(`${API_URL}/empleado/${id}`);
    return data;
  } catch (error) {
    console.error("Error al obtener empleado por ID", error);
    return error.response?.data || { message: "Error al obtener empleado", status: 500 };
  }
}

export async function createEmpleado(empleadoData) {
  try {
    const { data } = await axios.post(`${API_URL}/empleado/`, empleadoData);
    return data;
  } catch (error) {
    console.error("Error al crear empleado", error);
    return error.response?.data || { message: "Error al crear empleado", status: 500 };
  }
}

export async function updateEmpleado(id, empleadoData) {
  try {
    const { data } = await axios.put(`${API_URL}/empleado/${id}`, empleadoData);
    return data;
  } catch (error) {
    console.error("Error al actualizar empleado", error);
    return error.response?.data || { message: "Error al actualizar empleado", status: 500 };
  }
}

export async function deleteEmpleado(id) {
    try {
      const { data } = await axios.delete(`${API_URL}/empleado/${id}`);
      return data;
    } catch (error) {
      console.error("Error al eliminar empleado", error);
      return error.response?.data || { message: "Error al eliminar empleado", status: 500 };
    }
  }