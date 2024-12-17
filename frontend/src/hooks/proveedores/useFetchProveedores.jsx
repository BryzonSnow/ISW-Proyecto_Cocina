import { useState, useEffect } from 'react';
import { getProveedores, getProveedorById } from '@services/proveedor.service.js';
import { showErrorAlert } from '@helpers/sweetAlert.js';

const useFetchProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProveedores = async () => {
        try {
            setLoading(true);
            const data = await getProveedores();
            setProveedores(data);
        } catch (error) {
            console.error('Error al obtener proveedores:', error);
            showErrorAlert('Error', 'No se pudo cargar la lista de proveedores.');
        } finally {
            setLoading(false);
        }
    };

    const fetchProveedorById = async (id) => {
        try {
            setLoading(true);
            return await getProveedorById(id);
        } catch (error) {
            console.error(`Error al obtener el proveedor con ID ${id}:`, error);
            showErrorAlert('Error', 'No se pudo obtener el proveedor solicitado.');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProveedores();
    }, []);

    return { proveedores, fetchProveedores, fetchProveedorById, setProveedores, loading };
};

export default useFetchProveedores;
