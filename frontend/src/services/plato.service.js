import axios from "./root.service.js";

export async function getPlatos() {
    try {
        const { data } = await axios.get(`/plato/`);
        console.log("imprimiendo datos...");
        console.log(data);
        return data;
    } catch (error) {
        return error.response?.data || { message: 'Error al obtener platos', status: 500 };
    }
}

export async function getPlatoById(id) {
    try {
        const { data } = await axios.get(`/plato/${id}`);
        return data;
    } catch (error) {
        return error.response?.data || { message: 'Error al obtener plato:', status: 500 };
    }
}

export async function createPlato(platoData) {
    try {
        const { data } = await axios.post(`/plato/`, platoData);
        return data; // Ajusta según la estructura de tu respuesta del backend
    } catch (error) {
        return error.response?.data || { message: 'Error al crear plato', status: 500 };
    }
}
export async function updatePlato(id, platoData) {
    try {
        const { data } = await axios.put(`/plato/${id}`, platoData);
        console.log(data);
        return data;
    } catch (error) {
        return error.response?.data || { message: 'Error al actualizar plato', status: 500 };
    }
}

export async function deletePlato(id) {
    try {
        const { data } = await axios.delete(`/plato/${id}`);
        return data;
    } catch (error) {
        return error.response?.data || { message: 'Error al eliminar plato', status: 500 };
    }
}