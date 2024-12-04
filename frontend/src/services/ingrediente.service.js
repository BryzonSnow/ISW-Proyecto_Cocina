import axios from "axios";

const API_URL = "http://localhost:3000/api";

export async function getIngredientes() {
  try {
    const { data } = await axios.get(`${API_URL}/ingrediente/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    });
    return data;
  } catch (error) {
    return error.response?.data || { message: 'Error al obtener ingredientes', status: 500 };
  }
}

export async function createIngrediente(ingredienteData) {
  try {
    const { data } = await axios.post(`${API_URL}/ingrediente/`, ingredienteData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    });
    return data;
  } catch (error) {
    return error.response?.data || { message: 'Error al crear ingrediente', status: 500 };
  }
}

export async function getIngredienteById(id) {
  try {
    const { data } = await axios.get(`${API_URL}/ingrediente/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    });
    return data;
  } catch (error) {
    return error.response?.data || { message: 'Error al obtener ingrediente', status: 500 };
  }
}

export async function updateIngrediente(id, ingredienteData) {
  try {
    const { data } = await axios.put(`${API_URL}/ingrediente/${id}`, ingredienteData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    });
    return data;
  } catch (error) {
    return error.response?.data || { message: 'Error al actualizar ingrediente', status: 500 };
  }
}

export async function deleteIngrediente(id) {
  try {
    const { data } = await axios.delete(`${API_URL}/ingrediente/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    });
    return data;
  } catch (error) {
    return error.response?.data || { message: 'Error al eliminar ingrediente', status: 500 };
  }
}
