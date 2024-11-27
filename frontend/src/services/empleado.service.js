import axios from "axios";

export async function getEmpleado() {
    try {
        const { data } = await axios.get('/empleado/');
        return data;
    }catch (error) {
        return error.response?.data || { message: 'Error al obtener empleados', status: 500 };
    }
}

export async function getEmpleadoById(id) {
    try {
        const { data } = await axios.get(`/empleado/${id}`);
        return data;
    }catch (error) {
        return error.response?.data || { message: 'Error al obtener empleados:', status: 500 };
    }
}

export async function createEmpleado(empleadoData) {
    try {
        const { data } = await axios.post('/empleado/', empleadoData);
        return data; // Ajusta según la estructura de tu respuesta del backend
    }catch (error) {
        return error.response?.data || { message: 'Error al crear empleado', status: 500 };
    }
}

export async function updateEmpleado(id, empleadoData) {
    try {
        const { data } = await axios.put(`/empleado/${id}`, empleadoData);
        return data;
    }catch (error) {
        return error.response?.data || { message: 'Error al actualizar empleado', status: 500 };
    }
}

export async function deleteEmpleado(id) {
    try {
        const { data } = await axios.delete(`/empleado/${id}`);
        return data;
    }catch (error) {
        return error.response?.data || { message: 'Error al eliminar empleado', status: 500 };
    }
}