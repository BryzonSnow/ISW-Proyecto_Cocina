import { useState, useEffect } from 'react';
import { getIngredientes, createIngrediente } from '../services/ingrediente.service';

const Ingrediente = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [newIngrediente, setNewIngrediente] = useState({ nombre: '', cantidad: 0, porcion: 0 });

  // Función para obtener los ingredientes
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

    const data = await createIngrediente(newIngrediente);

    // Añadir el nuevo ingrediente a la lista
    setIngredientes([...ingredientes, data]);
    setNewIngrediente({ nombre: '', cantidad: 0, porcion: 0 }); // Reiniciar formulario
  };

  return (
    <div>
      <h1>Ingredientes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={newIngrediente.nombre}
          onChange={(e) => setNewIngrediente({ ...newIngrediente, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={newIngrediente.cantidad}
          onChange={(e) => setNewIngrediente({ ...newIngrediente, cantidad: parseInt(e.target.value) || 0 })}
        />
        <input
          type="number"
          placeholder="Porción"
          value={newIngrediente.porcion}
          onChange={(e) => setNewIngrediente({ ...newIngrediente, porcion: parseInt(e.target.value) || 0 })}
        />
        <button type="submit">Crear Ingrediente</button>
      </form>

      <ul>
        {ingredientes.map((ingrediente) => (
          <li key={ingrediente.ingredienteID}> {/* Usa ingredienteID como clave */}
            {ingrediente.nombre} - Cantidad: {ingrediente.cantidad}, Porción: {ingrediente.porcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ingrediente;
