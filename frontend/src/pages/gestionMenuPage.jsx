import { useState, useEffect } from "react";
import PlatoForm from "../components/platoForm.jsx";
import PlatoTable from "../components/platoTable.jsx";
import { getPlatos, createPlato, updatePlato, deletePlato } from "../services/plato.service";
import { getIngredientes } from "../services/ingrediente.service";
//import { useSnackbar } from "../components/SnackbarContext";

const GestionMenuPage = () => {
  const [platos, setPlatos] = useState([]); // Lista de platos
  const [ingredientes, setIngredientes] = useState([]); // Lista de ingredientes
  const [ingredientesCheck, setIngredientesCheck] = useState([]); // Ingredientes seleccionados
  const [newPlato, setNewPlato] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    disponibilidad: true,
    ingredienteID: [],
  });
  const [editPlato, setEditPlato] = useState(null); // Plato en edición
  //const { showSnackbar } = useSnackbar(); // Snackbar para notificaciones

  // Cargar datos al iniciar el componente
  useEffect(() => {
    async function fetchData() {
      try {
        const platosData = await getPlatos();
        const ingredientesData = await getIngredientes();
        setPlatos(platosData);
        setIngredientes(ingredientesData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        //showSnackbar("Error al cargar los datos", "error");
      }
    }
    fetchData();
  }, []);

  // Enviar formulario: crear o actualizar un plato
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ingredientesCheck.length === 0) {
      //showSnackbar("Debes seleccionar al menos un ingrediente.", "error");
      return;
    }

    try {
      const platoData = { ...newPlato, ingredienteID: ingredientesCheck };

      if (editPlato) {
        await updatePlato(editPlato.platoID, platoData);
        //showSnackbar("Plato actualizado correctamente.", "success");
      } else {
        await createPlato(platoData);
        //showSnackbar("Plato creado correctamente.", "success");
      }

      // Actualizar lista de platos y reiniciar formulario
      const updatedPlatos = await getPlatos();
      setPlatos(updatedPlatos);
      resetForm();
    } catch (error) {
      console.error("Error al guardar el plato:", error);
      //showSnackbar("Error al guardar el plato.", "error");
    }
  };

  const resetForm = () => {
    setNewPlato({
      nombre: "",
      descripcion: "",
      precio: 0,
      disponibilidad: true,
      ingredienteID: [],
    });
    setIngredientesCheck([]);
    setEditPlato(null);
  };

  // Editar un plato
  const handleEdit = (plato) => {
    setEditPlato(plato);
    setNewPlato({
      nombre: plato.nombre,
      descripcion: plato.descripcion,
      precio: plato.precio,
      disponibilidad: plato.disponibilidad,
    });
    setIngredientesCheck(plato.ingredienteID || []);
  };

  // Eliminar un plato
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este plato?")) {
      try {
        await deletePlato(id);
        setPlatos(platos.filter((plato) => plato.platoID !== id));
        //showSnackbar("Plato eliminado correctamente.", "success");
      } catch (error) {
        console.error("Error al eliminar el plato:", error);
        //showSnackbar("Error al eliminar el plato.", "error");
      }
    }
  };

  // Seleccionar o deseleccionar ingredientes
  const handleSelectIngrediente = (ingrediente) => {
    setIngredientesCheck((prev) =>
      prev.includes(ingrediente)
        ? prev.filter((i) => i !== ingrediente)
        : [...prev, ingrediente]
    );
  };

  // Renderizado de la página
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex gap-6">
      <PlatoForm
        newPlato={newPlato}
        ingredientes={ingredientes}
        ingredientesCheck={ingredientesCheck}
        onChange={setNewPlato}
        onSubmit={handleSubmit}
        onSelectIngrediente={handleSelectIngrediente}
        editPlato={editPlato}
      />
      <PlatoTable platos={platos} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default GestionMenuPage;
