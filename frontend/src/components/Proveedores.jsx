import { useState, useEffect } from "react";
import {
  getProveedores,
  createProveedor,
  updateProveedor,
  deleteProveedor,
} from "../services/proveedor.service";

const Proveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const [newProveedor, setNewProveedor] = useState({
    nombre: "",
    contacto: "",
    direccion: "",
  });
  const [editProveedor, setEditProveedor] = useState(null);

  useEffect(() => {
    async function fetchProveedores() {
      const data = await getProveedores();
      if (data.message) {
        alert(data.message);
        return;
      }
      setProveedores(data);
    }
    fetchProveedores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProveedor.nombre || !newProveedor.contacto || !newProveedor.direccion) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (editProveedor) {
      const updatedProveedor = await updateProveedor(editProveedor.proveedorID, newProveedor);
      if (updatedProveedor.message) {
        alert(updatedProveedor.message);
        return;
      }
      setProveedores(
        proveedores.map((prov) =>
          prov.proveedorID === updatedProveedor.proveedorID ? updatedProveedor : prov
        )
      );
      setEditProveedor(null);
    } else {
      const data = await createProveedor(newProveedor);
      if (data.message) {
        alert(data.message);
        return;
      }
      setProveedores([...proveedores, data]);
    }

    setNewProveedor({ nombre: "", contacto: "", direccion: "" });
  };

  const handleEdit = (proveedor) => {
    setEditProveedor(proveedor);
    setNewProveedor({
      nombre: proveedor.nombre,
      contacto: proveedor.contacto,
      direccion: proveedor.direccion,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este proveedor?");
    if (confirmDelete) {
      const result = await deleteProveedor(id);
      if (result.message) {
        alert(result.message);
        return;
      }
      setProveedores(proveedores.filter((prov) => prov.proveedorID !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex gap-6 items-start">
      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-md w-1/3 h-auto flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold mb-2">
          {editProveedor ? "Actualizar Proveedor" : "Crear Proveedor"}
        </h2>
        <div>
          <label className="block text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Nombre"
            value={newProveedor.nombre}
            onChange={(e) => setNewProveedor({ ...newProveedor, nombre: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Contacto</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Contacto"
            value={newProveedor.contacto}
            onChange={(e) => setNewProveedor({ ...newProveedor, contacto: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Dirección</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Dirección"
            value={newProveedor.direccion}
            onChange={(e) => setNewProveedor({ ...newProveedor, direccion: e.target.value })}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editProveedor ? "Actualizar" : "Crear"}
          </button>
          {editProveedor && (
            <button
              type="button"
              onClick={() => {
                setEditProveedor(null);
                setNewProveedor({ nombre: "", contacto: "", direccion: "" });
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Tabla */}
      <div className="flex-1 overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Contacto</th>
              <th className="px-4 py-2 text-left">Dirección</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.proveedorID} className="border-t">
                <td className="px-4 py-2">{proveedor.nombre}</td>
                <td className="px-4 py-2">{proveedor.contacto}</td>
                <td className="px-4 py-2">{proveedor.direccion}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(proveedor)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(proveedor.proveedorID)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Proveedor;