import { useState } from 'react';
import { updateProveedor } from '@services/proveedor.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useEditProveedor = (fetchProveedores) => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProveedor, setSelectedProveedor] = useState(null);

    const handleEdit = (proveedor) => {
        setSelectedProveedor(proveedor);
        setIsEditing(true);
    };

    const handleUpdateProveedor = async (id, proveedor) => {
        try {
            await updateProveedor(id, proveedor);
            showSuccessAlert('¡Actualizado!', 'El proveedor se ha actualizado correctamente.');
            setIsEditing(false);
            await fetchProveedores();
        } catch (error) {
            console.error('Error al actualizar proveedor:', error);
            showErrorAlert('Error', 'No se pudo actualizar el proveedor.');
        }
    };

    return { isEditing, selectedProveedor, handleEdit, handleUpdateProveedor, setIsEditing };
};

export default useEditProveedor;
