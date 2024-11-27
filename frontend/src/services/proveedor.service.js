import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Ajusta esto a tu configuración de backend

export async function getProveedores() {
  try {
    const { data } = await axios.get(`${API_URL}/proveedor/all`);
    return data;
  } catch (error) {
    return error.response?.data || { message: "Error al obtener proveedores", status: 500 };
  }
}

export async function getProveedorById(id) {
  try {
    const { data } = await axios.get(`${API_URL}/proveedor/${id}`);
    return data;
  } catch (error) {
    return error.response?.data || { message: "Error al obtener proveedor", status: 500 };
  }
}

export async function createProveedor(proveedorData) {
  try {
    const { data } = await axios.post(`${API_URL}/proveedor`, proveedorData);
    return data;
  } catch (error) {
    return error.response?.data || { message: "Error al crear proveedor", status: 500 };
  }
}

export async function updateProveedor(id, proveedorData) {
  try {
    const { data } = await axios.put(`${API_URL}/proveedor/${id}`, proveedorData);
    return data;
  } catch (error) {
    return error.response?.data || { message: "Error al actualizar proveedor", status: 500 };
  }
}

export async function deleteProveedor(id) {
  try {
    const { data } = await axios.delete(`${API_URL}/proveedor/${id}`);
    return data;
  } catch (error) {
    return error.response?.data || { message: "Error al eliminar proveedor", status: 500 };
  }
}

