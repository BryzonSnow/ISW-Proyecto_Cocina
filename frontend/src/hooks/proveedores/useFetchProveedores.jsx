import { useState, useEffect } from 'react';
import { getProveedores, getProveedorById } from '@services/proveedor.service.js';
import { showErrorAlert } from '@helpers/sweetAlert.js';

const useFetchProveedores = () => {
    const [proveedores, setProveedores] = useState([]); // Estado para almacenar la lista de proveedores
    const [loading, setLoading] = useState(false);      // Estado de carga para manejar la UI mientras se obtienen los datos

    // Función para obtener todos los proveedores
    const fetchProveedores = async () => {
        try {
            setLoading(true); // Indica que el proceso de carga está en curso
            const data = await getProveedores(); // Llama a la API para obtener la lista de proveedores
            setProveedores(data); // Almacena los datos obtenidos en el estado
        } catch (error) {
            console.error('Error al obtener proveedores:', error);
            showErrorAlert('Error', 'No se pudo cargar la lista de proveedores.');
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    // Función para obtener un proveedor específico por su ID
    const fetchProveedorById = async (id) => {
        try {
            setLoading(true);
            return await getProveedorById(id); // Llama a la API para obtener los detalles del proveedor por ID
        } catch (error) {
            console.error(`Error al obtener el proveedor con ID ${id}:`, error);
            showErrorAlert('Error', 'No se pudo obtener el proveedor solicitado.');
            throw error; // Lanza el error para manejarlo en el contexto donde se llame
        } finally {
            setLoading(false);
        }
    };

    // Efecto que se ejecuta al montar el componente para cargar la lista inicial de proveedores
    useEffect(() => {
        fetchProveedores();
    }, []);

    // Devuelve las funciones y estados para que puedan ser utilizados en el componente
    return { proveedores, fetchProveedores, fetchProveedorById, setProveedores, loading };
};

export default useFetchProveedores;
