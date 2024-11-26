import { useState, useEffect } from 'react';
import { 
  getIngredientes, 
  createIngrediente, 
  updateIngrediente, 
  deleteIngrediente 
} from '../services/ingrediente.service';

const Ingrediente = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [newIngrediente, setNewIngrediente] = useState({ nombre: '', cantidad: 0, porcion: 0 });
  const [editIngrediente, setEditIngrediente] = useState(null);
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario

  useEffect(() => {
    async function fetchIngredientes() {
      const data = await getIngredientes();
      setIngredientes(data);
    }
    fetchIngredientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newIngrediente.nombre || newIngrediente.cantidad <= 0 || newIngrediente.porcion <= 0) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    if (editIngrediente) {
      const updatedIngrediente = await updateIngrediente(editIngrediente.ingredienteID, newIngrediente);
      setIngredientes(
        ingredientes.map((ing) =>
          ing.ingredienteID === updatedIngrediente.ingredienteID ? updatedIngrediente : ing
        )
      );
      setEditIngrediente(null);
    } else {
      const data = await createIngrediente(newIngrediente);
      setIngredientes([...ingredientes, data]);
    }
    setNewIngrediente({ nombre: '', cantidad: 0, porcion: 0 });
    setShowForm(false); // Ocultar formulario después de enviar
  };

  const handleEdit = (ingrediente) => {
    setEditIngrediente(ingrediente);
    setNewIngrediente({
      nombre: ingrediente.nombre,
      cantidad: ingrediente.cantidad,
      porcion: ingrediente.porcion,
    });
    setShowForm(true); // Mostrar formulario al editar
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este ingrediente?");
    if (confirmDelete) {
      await deleteIngrediente(id);
      setIngredientes(ingredientes.filter((ing) => ing.ingredienteID !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col gap-6 items-start">
      {/* Botón para mostrar el formulario */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Crear Ingrediente
        </button>
      )}

      {/* Sección del formulario */}
      {showForm && (
        <form 
          onSubmit={handleSubmit} 
          className="bg-white p-4 rounded shadow-md w-1/3 h-auto flex flex-col gap-4"
        >
          <h2 className="text-xl font-semibold mb-2">
            {editIngrediente ? "Actualizar Ingrediente" : "Crear Ingrediente"}
          </h2>
          <div>
            <label className="block text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Nombre"
              value={newIngrediente.nombre}
              onChange={(e) => setNewIngrediente({ ...newIngrediente, nombre: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Cantidad</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Cantidad"
              value={newIngrediente.cantidad}
              onChange={(e) => setNewIngrediente({ ...newIngrediente, cantidad: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Porción</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Porción"
              value={newIngrediente.porcion}
              onChange={(e) => setNewIngrediente({ ...newIngrediente, porcion: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editIngrediente ? "Actualizar" : "Crear"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditIngrediente(null);
                setNewIngrediente({ nombre: '', cantidad: 0, porcion: 0 });
                setShowForm(false); // Ocultar formulario al cancelar
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Sección de la tabla */}
      <div className="flex-1 overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Cantidad</th>
              <th className="px-4 py-2 text-left">Porción</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ingredientes.map((ingrediente) => (
              <tr key={ingrediente.ingredienteID} className="border-t">
                <td className="px-4 py-2">{ingrediente.nombre}</td>
                <td className="px-4 py-2">{ingrediente.cantidad}</td>
                <td className="px-4 py-2">{ingrediente.porcion}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(ingrediente)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(ingrediente.ingredienteID)}
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

export default Ingrediente;
