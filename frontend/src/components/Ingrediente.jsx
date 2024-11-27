import { useState, useEffect } from "react";
import {
  getIngredientes,
  createIngrediente,
  updateIngrediente,
  deleteIngrediente,
} from "../services/ingrediente.service";
import { getInventarios } from "../services/inventario.service";

const Ingrediente = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [inventarios, setInventarios] = useState([]);
  const [newIngrediente, setNewIngrediente] = useState({
    nombre: "",
    cantidad: 0,
    porcion: 0,
    inventarioID: "",
  });
  const [editIngrediente, setEditIngrediente] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Cargar ingredientes e inventarios al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      const ingredientesData = await getIngredientes();
      const inventariosData = await getInventarios();
      setIngredientes(ingredientesData);
      setInventarios(inventariosData);
    };
    fetchData();
  }, []);

  // Manejar creación/edición de ingrediente
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, cantidad, porcion, inventarioID } = newIngrediente;

    if (!nombre || cantidad <= 0 || porcion <= 0 || !inventarioID) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    let updatedIngredientes;
    if (editIngrediente) {
      const updatedIngredienteResponse = await updateIngrediente(
        editIngrediente.ingredienteID,  // El ID del ingrediente a actualizar
        newIngrediente // Los nuevos valores, incluyendo el inventarioID
      );

      // Actualizamos el nombre del inventario al ingrediente editado
      const inventario = inventarios.find(
        (inv) => inv.inventarioID === parseInt(updatedIngredienteResponse.inventarioID)
      );

      const updatedIngredienteConInventario = {
        ...updatedIngredienteResponse,
        inventarioNombre: inventario ? inventario.nombre : "No disponible",
      };

      // Encontrar el índice del ingrediente que estamos editando
      const index = ingredientes.findIndex(
        (ing) => ing.ingredienteID === editIngrediente.ingredienteID
      );

      // Reemplazar el ingrediente en la posición correcta
      updatedIngredientes = [...ingredientes];
      updatedIngredientes[index] = updatedIngredienteConInventario;  // Reemplazar en la posición correcta

      setIngredientes(updatedIngredientes);  // Actualizar la lista de ingredientes en el estado
      setEditIngrediente(null);  // Resetear el estado de edición
    } else {
      const newIngredienteResponse = await createIngrediente(newIngrediente);

      // Buscar el nombre del inventario asociado al ingrediente recién creado
      const inventario = inventarios.find(
        (inv) => inv.inventarioID === parseInt(newIngredienteResponse.inventarioID)
      );

      // Agregar el nombre del inventario al ingrediente recién creado
      const ingredienteConNombreInventario = {
        ...newIngredienteResponse,
        inventarioNombre: inventario ? inventario.nombre : "No disponible",
      };

      updatedIngredientes = [...ingredientes, ingredienteConNombreInventario];
      setIngredientes(updatedIngredientes);  // Agregar el nuevo ingrediente al estado
    }

    setNewIngrediente({
      nombre: "",
      cantidad: 0,
      porcion: 0,
      inventarioID: "",
    });
    setShowForm(false);
  };

  // Manejar edición de ingrediente
  const handleEdit = (ingrediente) => {
    setEditIngrediente(ingrediente);
    setNewIngrediente({
      nombre: ingrediente.nombre,
      cantidad: ingrediente.cantidad,
      porcion: ingrediente.porcion,
      inventarioID: ingrediente.inventarioID || "", 
    });
    setShowForm(true);
  };

  // Manejar eliminación de ingrediente
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este ingrediente?")) {
      await deleteIngrediente(id);
      setIngredientes(ingredientes.filter((ing) => ing.ingredienteID !== id));  // Actualizar lista después de eliminar
    }
  };

  const getInventarioNombre = (inventarioID) => {
    if (!inventarioID) return "No disponible"; // Validar valores nulos o undefined
    const inventario = inventarios.find((inv) => inv.inventarioID === inventarioID);
    return inventario ? inventario.nombre : "No disponible";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col gap-6">
      {!showForm && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Crear Ingrediente
          </button>
        </div>
      )}
  
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-1/3"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editIngrediente ? "Actualizar Ingrediente" : "Crear Ingrediente"}
          </h2>
          <div>
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={newIngrediente.nombre}
              onChange={(e) =>
                setNewIngrediente({ ...newIngrediente, nombre: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1">Cantidad</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={newIngrediente.cantidad}
              onChange={(e) =>
                setNewIngrediente({
                  ...newIngrediente,
                  cantidad: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
          <div>
            <label className="block mb-1">Porción</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={newIngrediente.porcion}
              onChange={(e) =>
                setNewIngrediente({
                  ...newIngrediente,
                  porcion: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
          <div>
            <label className="block mb-1">Inventario</label>
            <select
              className="w-full border p-2 rounded"
              value={newIngrediente.inventarioID}
              onChange={(e) =>
                setNewIngrediente({ ...newIngrediente, inventarioID: e.target.value })
              }
            >
              <option value="">Selecciona un inventario</option>
              {inventarios.map((inventario) => (
                <option key={inventario.inventarioID} value={inventario.inventarioID}>
                  {inventario.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mt-4 gap-2">
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
                setNewIngrediente({
                  nombre: "",
                  cantidad: 0,
                  porcion: 0,
                  inventarioID: "",
                });
                setShowForm(false);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
  
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Porción</th>
              <th className="px-4 py-2">Inventario</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ingredientes.map((ingrediente) => (
              <tr key={ingrediente.ingredienteID} className="border-t">
                <td className="px-4 py-2">{ingrediente.nombre}</td>
                <td className="px-4 py-2">{ingrediente.cantidad}</td>
                <td className="px-4 py-2">{ingrediente.porcion}</td>
                <td className="px-4 py-2">
                  {ingrediente.inventarioNombre || getInventarioNombre(ingrediente.inventarioID)}
                </td>
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