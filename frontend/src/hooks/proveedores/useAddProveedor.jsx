import { createProveedor } from '@services/proveedor.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useAddProveedor = (fetchProveedores) => {
    const handleAddProveedor = async (proveedor) => {
        try {
            const newProveedor = await createProveedor(proveedor);
            showSuccessAlert('¡Creado!', 'El proveedor se ha registrado exitosamente.');
            await fetchProveedores();
        } catch (error) {
            console.error('Error al crear proveedor:', error);
            showErrorAlert('Error', 'No se pudo crear el proveedor.');
        }
    };

    return { handleAddProveedor };
};

export default useAddProveedor;
