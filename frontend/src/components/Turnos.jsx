import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getTurnos, createTurno } from "../services/turno.service";
import { getEmpleado } from "../services/empleado.service";

function Turnos() {
  const [turnos, setTurnos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTurnos, setSelectedTurnos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState({
    fecha: "",
    horaInicio: "",
    horaFin: "",
    empleadoID: "",
  });

  // Cargar turnos y empleados al montar el componente
  useEffect(() => {
    async function fetchData() {
      const turnosData = await getTurnos();
      setTurnos(turnosData);

      const empleadosData = await getEmpleado();
      setEmpleados(empleadosData);
    }
    fetchData();
  }, []);

  // Manejar selección de fecha en el calendario
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split("T")[0];
    const turnosForDate = turnos.filter((turno) => turno.fecha === formattedDate);
    setSelectedTurnos(turnosForDate);
    setIsModalVisible(true);
  };

  // Cerrar el modal
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedDate(null);
    setSelectedTurnos([]);
  };

  // Manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar el envío del formulario para crear un turno
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTurno = {
      fecha: form.fecha,
      horaInicio: form.horaInicio,
      horaFin: form.horaFin,
      empleado: { empleadoID: parseInt(form.empleadoID) }, // Convertir a número
    };

    try {
      const createdTurno = await createTurno(newTurno);
      alert("Turno creado exitosamente");

      // Actualizar la lista de turnos sin recargar
      setTurnos((prev) => [...prev, createdTurno]);

      // Reiniciar el formulario
      setForm({
        fecha: "",
        horaInicio: "",
        horaFin: "",
        empleadoID: "",
      });
    } catch (error) {
      console.error("Error al crear turno", error);
      alert("Hubo un error al crear el turno");
    }
  };

  return (
    <div>
      <h1>Gestión de Turnos</h1>
      <Calendar onClickDay={handleDateChange} />
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Turnos del día {selectedDate?.toLocaleDateString()}</h2>
            {selectedTurnos.length > 0 ? (
              <ul>
                {selectedTurnos.map((turno) => (
                  <li key={turno.turnoID}>
                    <p>
                      <strong>Hora Inicio:</strong> {turno.horaInicio}{" "}
                      <strong>Hora Fin:</strong> {turno.horaFin}
                    </p>
                    <p>
                      <strong>Empleado:</strong> {turno.empleado?.nombre || "No asignado"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay turnos para esta fecha.</p>
            )}
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      <h2>Crear Nuevo Turno</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Fecha:
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleFormChange}
            required
          />
        </label>
        <label>
          Hora Inicio:
          <input
            type="time"
            name="horaInicio"
            value={form.horaInicio}
            onChange={handleFormChange}
            required
          />
        </label>
        <label>
          Hora Fin:
          <input
            type="time"
            name="horaFin"
            value={form.horaFin}
            onChange={handleFormChange}
            required
          />
        </label>
        <label>
          Empleado:
          <select
            name="empleadoID"
            value={form.empleadoID}
            onChange={handleFormChange}
            required
          >
            <option value="">Seleccione un empleado</option>
            {empleados.map((empleado) => (
              <option key={empleado.empleadoID} value={empleado.empleadoID}>
                {empleado.nombre}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Crear Turno</button>
      </form>
    </div>
  );
}

export default Turnos;
