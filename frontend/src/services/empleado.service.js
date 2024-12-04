import axios from "./root.service.js";

export async function getEmpleado() {
  try {
    const { data } = await axios.get(`/empleado/all`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error al obtener empleados", error);
    return [];
  }
}

export async function getEmpleadoById(id) {
  try {
    const { data } = await axios.get(`/empleado/${id}`);
    return data;
  } catch (error) {
    console.error("Error al obtener empleado por ID", error);
    return error.response?.data || { message: "Error al obtener empleado", status: 500 };
  }
}

export async function createEmpleado(empleadoData) {
  try {
    const { data } = await axios.post(`/empleado/create`, empleadoData);
    return data;
  } catch (error) {
    console.error("Error al crear empleado", error);
    return error.response?.data || { message: "Error al crear empleado", status: 500 };
  }
}

export async function updateEmpleado(id, empleadoData) {
  try {
    const { data } = await axios.put(`/empleado/update?id=${id}`, empleadoData);
    return data;
  } catch (error) {
    console.error("Error al actualizar empleado", error);
    return error.response?.data || { message: "Error al actualizar empleado", status: 500 };
  }
}

export async function deleteEmpleado(id) {
  try {
    const { data } = await axios.delete(`/empleado/delete?id=${id}`);
    return data;
  } catch (error) {
    console.error("Error al eliminar empleado", error);
    return error.response?.data || { message: "Error al eliminar empleado", status: 500 };
  }
}
