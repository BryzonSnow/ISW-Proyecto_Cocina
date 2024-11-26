import { useState, useEffect } from "react";
import {
  getInventarios,
  createInventario,
  updateInventario,
  deleteInventario,
} from "../services/inventario.service";

const Inventario = () => {
  const [inventarios, setInventarios] = useState([]);
  const [newInventario, setNewInventario] = useState({ nombre: "", cantidad: 0 });
  const [editInventario, setEditInventario] = useState(null);

  useEffect(() => {
    async function fetchInventarios() {
      const data = await getInventarios();
      setInventarios(data);
    }
    fetchInventarios();
  }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    if (editInventario) {
      const updated = await updateInventario(editInventario.id, newInventario);
      setInventarios((prev) =>
        prev.map((inv) => (inv.id === updated.id ? updated : inv))
      );
    } else {
      const created = await createInventario(newInventario);
      setInventarios((prev) => [...prev, created]);
    }
    setNewInventario({ nombre: "", cantidad: 0 });
    setEditInventario(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este inventario?")) {
      await deleteInventario(id);
      setInventarios((prev) => prev.filter((inv) => inv.id !== id));
    }
  };

  const handleEdit = (inventario) => {
    setEditInventario(inventario);
    setNewInventario({ nombre: inventario.nombre, cantidad: inventario.cantidad });
  };

  return (
    <div>
      <h1>Gestión de Inventarios</h1>
      <form onSubmit={handleCreateOrUpdate}>
        <input
          type="text"
          value={newInventario.nombre}
          onChange={(e) => setNewInventario({ ...newInventario, nombre: e.target.value })}
          placeholder="Nombre del inventario"
        />
        <input
          type="number"
          value={newInventario.cantidad}
          onChange={(e) => setNewInventario({ ...newInventario, cantidad: +e.target.value })}
          placeholder="Cantidad"
        />
        <button type="submit">{editInventario ? "Actualizar" : "Crear"}</button>
      </form>
      <ul>
        {inventarios.map((inventario) => (
          <li key={inventario.id}>
            {inventario.nombre} - {inventario.cantidad}
            <button onClick={() => handleEdit(inventario)}>Editar</button>
            <button onClick={() => handleDelete(inventario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventario;
