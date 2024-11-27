import { useState, useEffect } from "react";
import {
  getInventarios,
  createInventario,
  updateInventario,
  deleteInventario,
} from "../services/inventario.service";
import { getIngredientes } from "../services/ingrediente.service"; // Suponiendo que tienes un servicio para obtener ingredientes

const Inventario = () => {
  const [inventarios, setInventarios] = useState([]);
  const [ingredientes, setIngredientes] = useState([]); // Estado para los ingredientes
  const [newInventario, setNewInventario] = useState({ nombre: "", cantidad: 0, ingredienteId: "" });
  const [editInventario, setEditInventario] = useState(null);

  useEffect(() => {
    async function fetchInventarios() {
      const data = await getInventarios();
      setInventarios(data);
    }

    async function fetchIngredientes() {
      const data = await getIngredientes(); // Obteniendo la lista de ingredientes
      setIngredientes(data);
    }

    fetchInventarios();
    fetchIngredientes();
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
    setNewInventario({ nombre: "", cantidad: 0, ingredienteId: "" });
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
    setNewInventario({
      nombre: inventario.nombre,
      cantidad: inventario.cantidad,
      ingredienteId: inventario.ingrediente ? inventario.ingrediente.id : "", // Asegúrate de que el inventario tenga el ingrediente
    });
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

        {/* Agregar un select para elegir el ingrediente */}
        <select
          value={newInventario.ingredienteId}
          onChange={(e) => setNewInventario({ ...newInventario, ingredienteId: e.target.value })}
        >
          <option value="">Selecciona un ingrediente</option>
          {ingredientes.map((ingrediente) => (
            <option key={ingrediente.id} value={ingrediente.id}>
              {ingrediente.nombre}
            </option>
          ))}
        </select>

        <button type="submit">{editInventario ? "Actualizar" : "Crear"}</button>
      </form>

      <ul>
        {inventarios.map((inventario) => (
          <li key={inventario.id}>
            {inventario.nombre} - {inventario.cantidad} - {inventario.ingrediente?.nombre || "Sin ingrediente"}
            <button onClick={() => handleEdit(inventario)}>Editar</button>
            <button onClick={() => handleDelete(inventario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventario;
