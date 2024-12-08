import { deleteDataAlert } from "../helpers/sweetAlert";
import { deleteProveedor } from "../services/proveedor.service";

const useDeleteProveedor = () => {
    const deleteProveedorById = async (id) => {
        const result = await deleteDataAlert();
        if (result.isConfirmed) {
            const response = await deleteProveedor(id);
            if (response.message) {
                alert(response.message);
            }
        }
    };

    return { deleteProveedorById };
};

export default useDeleteProveedor;
