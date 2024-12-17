export const ProveedorTable = ({ proveedores, onEdit, onDelete }) => {
    return (
        <table className="table-container">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Dirección</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {proveedores.map((prov) => (
                <tr key={prov.proveedorID}>
                <td>{prov.nombre}</td>
                <td>{prov.contacto}</td>
                <td>{prov.direccion}</td>
                <td>
                    <button onClick={() => onEdit(prov)}>Editar</button>
                    <button
                    onClick={() =>
                        confirm("¿Estás seguro de eliminar este proveedor?") &&
                        onDelete(prov.proveedorID)
                    }
                    >
                    Eliminar
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};