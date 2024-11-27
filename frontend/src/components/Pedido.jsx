import { useState, useEffect } from "react";
import {
  getPedidos,
  createPedido,
  updatePedido,
} from "../services/pedido.service";
import { getCliente } from "../services/cliente.service";
import { getPlatos  } from "../services/plato.service";

const Pedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [finalizados, setFinalizados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [platos, setPlatos] = useState([]); // Almacenamos los platos aquí
  const [newPedido, setNewPedido] = useState({
    clienteID: "",
    platoID: "",
    estado: "Pendiente",
    fecha: new Date().toISOString().split("T")[0],
    total: 0,
  });
  const [editPedido, setEditPedido] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const platosData = await getPlatos();
        console.log("Platos recibidos desde la API:", platosData); // Agrega este log
        setPlatos(platosData); // Asegúrate de que este es un array
      } catch (error) {
        console.error("Error al cargar los platos:", error.message);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPedido.clienteID || !newPedido.platoID || newPedido.total <= 0) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }

    try {
      if (editPedido) {
        const updatedPedido = await updatePedido(editPedido.pedidoID, newPedido);
        setPedidos(
          pedidos.map((p) =>
            p.pedidoID === updatedPedido.pedidoID ? updatedPedido : p
          )
        );
        setEditPedido(null);
      } else {
        const createdPedido = await createPedido(newPedido);
        setPedidos([...pedidos, createdPedido]);
      }
      setNewPedido({
        clienteID: "",
        platoID: "",
        estado: "Pendiente",
        fecha: new Date().toISOString().split("T")[0],
        total: 0,
      });
    } catch (error) {
      alert("Error al guardar el pedido: " + error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col gap-6">
      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-md w-1/3 h-auto flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold mb-2">
          {editPedido ? "Editar Pedido" : "Crear Pedido"}
        </h2>
        <div>
          <label className="block text-gray-700 mb-1">Cliente</label>
          <select
            className="w-full p-2 border rounded"
            value={newPedido.clienteID}
            onChange={(e) =>
              setNewPedido({ ...newPedido, clienteID: e.target.value })
            }
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.clienteID} value={cliente.clienteID}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Plato</label>
          <select
            className="w-full p-2 border rounded"
            value={newPedido.platoID}
            onChange={(e) =>
              setNewPedido({ ...newPedido, platoID: e.target.value })
            }
          >
            <option value="">Seleccione un plato</option>
            {platos.map((plato) => (
              <option key={plato.platoID} value={plato.platoID}>
                {plato.nombre} - ${plato.precio}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editPedido ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* Lista de Pedidos */}
      <div className="flex-1 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-2">Pedidos Activos</h2>
        <table className="table-auto w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Cliente</th>
              <th className="px-4 py-2">Plato</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.pedidoID}>
                <td>{pedido.clienteID}</td>
                <td>{platoIDToName(pedido.platoID)}</td>
                <td>{pedido.estado}</td>
                <td>{pedido.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pedido;
