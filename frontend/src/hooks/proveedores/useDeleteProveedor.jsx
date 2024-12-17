import { deleteProveedor } from '@services/proveedor.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteProveedor = (fetchProveedores) => {
    const handleDeleteProveedor = async (id) => {
        try {
            const result = await deleteDataAlert();
            if (result.isConfirmed) {
                await deleteProveedor(id);
                showSuccessAlert('¡Eliminado!', 'El proveedor ha sido eliminado correctamente.');
                await fetchProveedores();
            } else {
                showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
            }
        } catch (error) {
            console.error('Error al eliminar proveedor:', error);
            showErrorAlert('Error', 'No se pudo eliminar el proveedor.');
        }
    };

    return { handleDeleteProveedor };
};

export default useDeleteProveedor;
