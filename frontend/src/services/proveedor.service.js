import axios from "axios";

export async function getProveedores() {
    try {
        const { data } = await axios.get('/proveedor/');
        return data;
    } catch (error) {
        return error.response?.data || { message: 'Error al obtener proveedores', status: 500 };
    }
}

export async function getProveedorById(id) {
    try {
        const { data } = await axios.get(`/proveedor/${id}`);
        return data;
    } catch (error) {
        return error.response?.data || { message: 'Error al obtener proveedor:', status: 500 };
    }
}

export async function createProveedor(proveedorData) {
    try {
        const { data } = await axios.post('/proveedor/', proveedorData);
        return data; // Ajusta según la estructura de tu respuesta del backend
    } catch (error) {
        return error.response?.data || { message: 'Error creating proveedor', status: 500 };
    }
}

export async function updateProveedor(id, proveedorData) {
    try {
        const { data } = await axios.put(`/proveedor/${id}`, proveedorData);
        return data;
    } catch (error) {
        return error.response?.data || { message: 'Error al actualizar proveedor', status: 500 };
    }
}

export async function deleteProveedor(id) {
    try {
        const { data } = await axios.delete(`/proveedor/${id}`);
        return data;
    } catch (error) {
        return error.response?.data || { message: 'Error al eliminar proveedor', status: 500 };
    }
}