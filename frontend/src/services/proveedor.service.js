import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/proveedor";

export const getProveedores = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/all`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error("Error al obtener los proveedores");
  }
};

export const getProveedorById = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error("Error al obtener el proveedor");
  }
};

export const createProveedor = async (proveedor) => {
  try {
    const { data } = await axios.post(API_URL, proveedor);
    return data;
  } catch (error) {
    throw error.response?.data || new Error("Error al crear el proveedor");
  }
};

export const updateProveedor = async (id, proveedor) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, proveedor);
    return data;
  } catch (error) {
    throw error.response?.data || new Error("Error al actualizar el proveedor");
  }
};

export const deleteProveedor = async (id) => {
  try {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error("Error al eliminar el proveedor");
  }
};
