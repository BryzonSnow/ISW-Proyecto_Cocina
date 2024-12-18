import PropTypes from "prop-types";

const PlatoForm = ({
  newPlato,
  ingredientes,
  ingredientesCheck,
  onChange,
  onSubmit,
  onSelectIngrediente,
  editPlato,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded shadow-md w-1/3 h-auto flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold mb-2">
        {editPlato ? "Actualizar Plato" : "Crear Plato"}
      </h2>

    <div>
        <label className="block text-gray-700 mb-1">Nombre</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Nombre"
          value={newPlato.nombre}
          onChange={(e) => onChange({ ...newPlato, nombre: e.target.value })}
        />
    </div>

    <div>
        <label className="block text-gray-700 mb-1">Descripción</label>
        <textarea
        className="w-full p-2 border rounded"
        placeholder="Descripción"
        value={newPlato.descripcion}
        onChange={(e) =>
            onChange({ ...newPlato, descripcion: e.target.value })
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
            onChange({ ...newPlato, precio: parseFloat(e.target.value) })
          }
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Disponibilidad</label>
        <select
          className="w-full p-2 border rounded"
          value={newPlato.disponibilidad}
          onChange={(e) =>
            onChange({ ...newPlato, disponibilidad: e.target.value === "true" })
          }
        >
          <option value="true">Disponible</option>
          <option value="false">No Disponible</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Ingredientes</label>
        <div className="border p-2 rounded h-40 overflow-y-scroll">
          {ingredientes.map((ingrediente) => (
            <label
              key={ingrediente.ingredienteID}
              className="flex items-center gap-2 mb-1"
            >
              <input
                type="checkbox"
                checked={ingredientesCheck.some(
                  (ing) => ing.ingredienteID === ingrediente.ingredienteID
                )}
                onChange={() => onSelectIngrediente(ingrediente)}
              />
              {ingrediente.nombre}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="text-white px-4 py-2 rounded hover:opacity-90"
        style={{ backgroundColor: "#FF5722" }}
      >
        {editPlato ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

PlatoForm.propTypes = {
  newPlato: PropTypes.shape({
    nombre: PropTypes.string,
    descripcion: PropTypes.string,
    precio: PropTypes.number,
    disponibilidad: PropTypes.bool,
  }).isRequired,
  ingredientes: PropTypes.arrayOf(
    PropTypes.shape({
      ingredienteID: PropTypes.number,
      nombre: PropTypes.string,
    })
  ).isRequired,
  ingredientesCheck: PropTypes.arrayOf(
    PropTypes.shape({
      ingredienteID: PropTypes.number,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSelectIngrediente: PropTypes.func.isRequired,
  editPlato: PropTypes.object,
};

export default PlatoForm;
