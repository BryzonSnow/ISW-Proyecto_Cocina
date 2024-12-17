import { useState, useEffect } from "react";
import {
  getPlatos,
  createPlato,
  updatePlato,
  deletePlato,
} from "../services/plato.service";
import { getIngredientes } from "../services/ingrediente.service"; // Agregamos este servicio
import { useSnackbar } from "../components/SnackbarContext.jsx"; // Importar el hook

// Componente de la página de gestión de menú
const GestionMenu = () => {
  const [platos, setPlatos] = useState([]);
  const [ingredientes, setIngredientes] = useState([]); // Lista de ingredientes disponibles
  const [ingredientesCheck, setingredientesCheck] = useState([]);
  const [newPlato, setNewPlato] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    disponibilidad: true,
    ingredienteID: [], // ID de ingredientes seleccionados
  });
  const [editPlato, setEditPlato] = useState(null);
  const { showSnackbar } = useSnackbar(); // Usar el hook para mostrar el Snackbar


  // Cargar platos e ingredientes al inicio
  useEffect(() => {
    async function fetchData() {
      try {
        const platosData = await getPlatos();
        console.log(platosData);
        const ingredientesData = await getIngredientes();
        if (Array.isArray(platosData)) setPlatos(platosData);
        if (Array.isArray(ingredientesData)) setIngredientes(ingredientesData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }
    fetchData();
  }, []);

  const updateFetchData = async () => {
    try {
      const platosData = await getPlatos();
      const ingredientesData = await getIngredientes();
      if (Array.isArray(platosData)) setPlatos(platosData);
      if (Array.isArray(ingredientesData)) setIngredientes(ingredientesData);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  // Manejo del formulario (crear o actualizar plato)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm = {
      nombre: newPlato.nombre,
      descripcion: newPlato.descripcion,
      precio: newPlato.precio,
      disponibilidad: newPlato.disponibilidad,
      ingredienteID: newPlato.ingredienteID,
    };
    const dataFormEdit = {
      nombre: newPlato.nombre,
      descripcion: newPlato.descripcion,
      precio: newPlato.precio,
      disponibilidad: newPlato.disponibilidad,
      ingredienteID: newPlato.ingredientesCheck,
    };
    const formData = new FormData();
    formData.append("nombre", newPlato.nombre);
    formData.append("descripcion", newPlato.descripcion);
    formData.append("precio", newPlato.precio);
    formData.append("disponibilidad", newPlato.disponibilidad);


    // Convertir a JSON los ingredientes seleccionados
    formData.append("ingredienteID", JSON.stringify(ingredientesCheck));

    // Validar que haya al menos un ingrediente seleccionado
  if (!ingredientesCheck || ingredientesCheck.length === 0) {
    showSnackbar("Debes seleccionar al menos un ingrediente.", "error");
    return;
  }
  newPlato.ingredienteID = ingredientesCheck;

    if (!newPlato.nombre || !newPlato.descripcion || newPlato.precio <= 0) {
      showSnackbar("Por favor, completa todos los campos correctamente.", "error");
      return;
    }

    if (editPlato) {
      console.log(newPlato);
      // Actualizar plato
      const updatedPlato = await updatePlato(editPlato.platoID, newPlato);
      if (updatedPlato?.platoID) {
        setPlatos(
          platos.map((plato) =>
            plato.platoID === updatedPlato.platoID ? updatedPlato : plato
          ),
          
        );
      }
      setEditPlato(null);
    } else {
      // Crear nuevo plato
      console.log(newPlato);
      const data = await createPlato(newPlato);
      setPlatos([...platos, data]);
      }
      setNewPlato({
        nombre: "",
        descripcion: "",
        precio: 0,
        disponibilidad: true,
        ingredienteID: [],
      });
      try {
        if (editPlato) {
          // Actualizar plato
          const updatedPlato = await updatePlato(editPlato.platoID, newPlato);
          if (updatedPlato?.platoID) {
            showSnackbar("Plato actualizado correctamente.", "success");
            updateFetchData(); // Refrescar la tabla de datos
          }
          setEditPlato(null);
        } else {
            showSnackbar("Plato creado exitosamente", "success");
            updateFetchData(); // Refrescar la tabla de datos
        }
    
        // Reiniciar el formulario
        setNewPlato({
          nombre: "",
          descripcion: "",
          precio: 0,
          disponibilidad: true,
          ingredienteID: [],
        });
        setingredientesCheck([]);
      } catch (error) {
        console.error("Error al guardar el plato:", error);
        showSnackbar("Ocurrió un error al guardar el plato. Inténtalo de nuevo.", "error");
      }

    };  // Fin de la función handleSubmit

  // Manejar la edición de un plato
  const handleEdit = (plato) => {

    console.log("Plato a editar:", plato); // Mostrar el plato a editar
    
    setingredientesCheck([]);
    setEditPlato(plato);
    console.log(plato);

    setNewPlato({
        platoID: plato.platoID,
        nombre: plato.nombre,
        descripcion: plato.descripcion,
        precio: plato.precio,
        disponibilidad: plato.disponibilidad,
        ingredienteID: plato.ingredienteID,
    });

    console.log(plato);

    setingredientesCheck((prevIngredientesCheck) => [
        ...prevIngredientesCheck,
        ...plato.ingredienteID,
    ]);

    // Estos logs no mostrarán los valores actualizados porque setState es asincrónico
    console.log(editPlato);
    console.log(ingredientesCheck);
    console.log(ingredientes);
  };

// UseEffect para observar cambios en el estado
useEffect(() => {
    console.log("EditPlato actualizado:", editPlato);
}, [editPlato]);

useEffect(() => {
    console.log("IngredientesCheck actualizado:", ingredientesCheck);
}, [ingredientesCheck]);

  // Manejar la selección de ingredientes
  const handleSelectIngrediente = (ingredienteSeleccionado) => {
    setingredientesCheck((prevIngredientesCheck) => {
      if (!Array.isArray(prevIngredientesCheck)) {
        console.error("El estado ingredientesCheck no es un array:", prevIngredientesCheck);
        return []; // Devolver array vacío
    }
        const yaSeleccionado = prevIngredientesCheck.some(
            (ingrediente) => ingrediente.ingredienteID === ingredienteSeleccionado.ingredienteID
        );

        // Si ya está seleccionado, lo eliminamos; si no, lo agregamos
        return yaSeleccionado
            ? prevIngredientesCheck.filter(
                  (ingrediente) => ingrediente.ingredienteID !== ingredienteSeleccionado.ingredienteID
              ) // Eliminar
            : [...prevIngredientesCheck, ingredienteSeleccionado]; // Agregar
    });
};

  // Manejar la eliminación de un plato
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar este plato?"
    );
    if (confirmDelete) {
      const result = await deletePlato(id);
      if (result?.status !== 500) {
        setPlatos(platos.filter((plato) => plato.platoID !== id));
      } else {
        showSnackbar("Error al eliminar el plato", "error");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex gap-6 items-start">
      {/* Formulario de creación/edición */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-md w-1/3 h-auto flex flex-col gap-4"
      >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="text-xl font-semibold mb-2">
          {editPlato ? "Actualizar Plato" : "Crear Plato"}
        </h2>
        <a href="http://localhost:5173/gestionmenu" style={{ textDecoration: 'none' }}>
    <button style={{
      backgroundColor: '#6C757D',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '5px'
    }}>
      Atrás
    </button>
  </a>
  </div>
        <div>
          <label className="block text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Nombre"
            value={newPlato.nombre}
            onChange={(e) =>
              setNewPlato({ ...newPlato, nombre: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Descripción</label>
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Descripción"
            value={newPlato.descripcion}
            onChange={(e) =>
              setNewPlato({ ...newPlato, descripcion: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Precio</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Precio"
            value={newPlato.precio}
            onChange={(e) =>
              setNewPlato({ ...newPlato, precio: parseFloat(e.target.value) })
            }
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Disponibilidad</label>
          <select
            className="w-full p-2 border rounded"
            value={newPlato.disponibilidad}
            onChange={(e) =>
              setNewPlato({ ...newPlato, disponibilidad: e.target.value === "true" })
            }
          >
            <option value="true">Disponible</option>
            <option value="false">No Disponible</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Ingredientes</label>
          {/* Contenedor desplazable */}
          <div className="border p-2 rounded h-40 overflow-y-scroll">
            {ingredientes.map((ingrediente) => (
              <label key={ingrediente.ingredienteID} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={ingredientesCheck.some(
                    (ingredienteCheck) =>
                      ingrediente.ingredienteID === ingredienteCheck.ingredienteID
                  )}
                  onChange={() => handleSelectIngrediente(ingrediente)}
                />
                {ingrediente.nombre}
              </label>
          ))}
        </div>
</div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editPlato ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>

      {/* Tabla de platos */}
      <div className="flex-1 overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">Precio</th>
              <th className="px-4 py-2 text-left">Disponibilidad</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {platos.map((plato) => (
              <tr key={plato.platoID} className="border-t">
                <td className="px-4 py-2">{plato.nombre}</td>
                <td className="px-4 py-2">{plato.descripcion}</td>
                <td className="px-4 py-2">${plato.precio}</td>
                <td className="px-4 py-2">
                  {plato.disponibilidad ? "Disponible" : "No Disponible"}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(plato)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                  >Editar</button>
                  <button
                    onClick={() => handleDelete(plato.platoID)}
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
export default GestionMenu;
