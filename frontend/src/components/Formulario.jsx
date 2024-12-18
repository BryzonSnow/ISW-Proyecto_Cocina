import React, { useState } from 'react';
import { validarFormulario } from '../utils/validation';  // Asegúrate de importar desde la ruta correcta

const Formulario = () => {
    const [data, setData] = useState({
        rut: '',
        email: '',
        password: '',
    });

    const [errores, setErrores] = useState({});
    const [mensajeExito, setMensajeExito] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
        ...data,
        [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validamos el formulario antes de enviarlo
        const erroresValidacion = validarFormulario(data);
        if (Object.keys(erroresValidacion).length > 0) {
        setErrores(erroresValidacion);
        } else {
        // Enviar datos al backend (lógica que ya tienes configurada)
        // Simulación de mensaje de éxito
        setMensajeExito("Formulario enviado correctamente");
        setErrores({});
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">Correo Electrónico</label>
            <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            />
            {errores.email && <span>{errores.email}</span>}
        </div>

        <div>
            <label htmlFor="rut">RUT</label>
            <input
            type="text"
            id="rut"
            name="rut"
            value={data.rut}
            onChange={handleChange}
            />
            {errores.rut && <span>{errores.rut}</span>}
        </div>

        <div>
            <label htmlFor="password">Contraseña</label>
            <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            />
            {errores.password && <span>{errores.password}</span>}
        </div>

        <button type="submit">Enviar</button>

        {mensajeExito && <p>{mensajeExito}</p>}
        </form>
    );
};

export default Formulario;
