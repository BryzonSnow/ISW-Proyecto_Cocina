import { ProveedorForm } from "@components/ProveedorForm";
import { ProveedorTable } from "@components/ProveedorTable";
import useFetchProveedores from '@hooks/useFetchProveedores';
import useAddProveedor from '@hooks/useAddProveedor';
import useEditProveedor from '@hooks/useEditProveedor';
import useDeleteProveedor from '@hooks/useDeleteProveedor';

const ProveedoresPage = () => {
    const { proveedores, fetchProveedores, loading } = useFetchProveedores();
    const { handleAddProveedor } = useAddProveedor(fetchProveedores);
    const { isEditing, selectedProveedor, handleEdit, handleUpdateProveedor, setIsEditing } = useEditProveedor(fetchProveedores);
    const { handleDeleteProveedor } = useDeleteProveedor(fetchProveedores);

    return (
        <div>
            {loading && <p>Cargando...</p>}
            {!loading && (
                <>
                    <ProveedorForm
                        onSubmit={(data) =>
                            isEditing
                                ? handleUpdateProveedor(selectedProveedor.id, data)
                                : handleAddProveedor(data)
                        }
                        initialValues={isEditing ? selectedProveedor : undefined}
                        onCancel={() => setIsEditing(false)}
                    />
                    <ProveedorTable
                        proveedores={proveedores}
                        onEdit={handleEdit}
                        onDelete={handleDeleteProveedor}
                    />
                </>
            )}
        </div>
    );
};

export default ProveedoresPage;