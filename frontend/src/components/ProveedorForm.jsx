import { useState } from "react";

export const ProveedorForm = ({
    onSubmit,
    initialValues = { nombre: "", contacto: "", direccion: "" },
    confirmMessage,
    onCancel,
}) => {
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValues.nombre || !formValues.contacto || !formValues.direccion) {
        alert("Todos los campos son obligatorios");
        return;
        }
        if (confirm(confirmMessage || "¿Estás seguro de continuar?")) {
        onSubmit(formValues);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
        <div>
            <label>Nombre</label>
            <input
            name="nombre"
            value={formValues.nombre}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Contacto</label>
            <input
            name="contacto"
            value={formValues.contacto}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Dirección</label>
            <input
            name="direccion"
            value={formValues.direccion}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <button type="submit">Guardar</button>
            {onCancel && <button onClick={onCancel}>Cancelar</button>}
        </div>
        </form>
    );
};