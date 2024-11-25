import React, { useState, useEffect } from 'react';
import { getIngredientes, createIngrediente } from '../services/ingrediente.service';

const Ingrediente = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [newIngrediente, setNewIngrediente] = useState({ nombre: '', descripcion: '' });

  // Función para obtener los ingredientes
  useEffect(() => {
    async function fetchIngredientes() {
      const data = await getIngredientes();
      setIngredientes(data);
    }

    fetchIngredientes();
  }, []);

  // Función para crear un nuevo ingrediente
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createIngrediente(newIngrediente);
    setIngredientes([...ingredientes, data]); // Añadir el nuevo ingrediente
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
          type="text"
          placeholder="Descripción"
          value={newIngrediente.descripcion}
          onChange={(e) => setNewIngrediente({ ...newIngrediente, descripcion: e.target.value })}
        />
        <button type="submit">Crear Ingrediente</button>
      </form>

      <ul>
        {ingredientes.map((ingrediente) => (
          <li key={ingrediente.id}> {/* Usa un identificador único, como 'id' */}
            {ingrediente.nombre} - {ingrediente.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ingrediente;
