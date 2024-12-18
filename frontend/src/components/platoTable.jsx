import PropTypes from 'prop-types';

const PlatoTable = ({ platos, onEdit, onDelete }) => {
    return (
      <div className="flex-1 overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Disponibilidad</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {platos.map((plato) => (
              <tr key={plato.platoID}>
                <td className="px-4 py-2">{plato.nombre}</td>
                <td className="px-4 py-2">{plato.descripcion}</td>
                <td className="px-4 py-2">${plato.precio}</td>
                <td className="px-4 py-2">
                  {plato.disponibilidad ? "Disponible" : "No Disponible"}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => onEdit(plato)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(plato.platoID)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      );
  };
  
  PlatoTable.propTypes = {
    platos: PropTypes.arrayOf(
      PropTypes.shape({
        platoID: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
        disponibilidad: PropTypes.bool.isRequired,
      })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };
  
  export default PlatoTable;
  