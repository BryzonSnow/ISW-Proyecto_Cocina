// useProveedorForm.jsx
import { useState } from 'react';

const useProveedorForm = (initialState = {}) => {
    const [proveedor, setProveedor] = useState(initialState);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProveedor((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!proveedor.nombre || !proveedor.contacto || !proveedor.direccion) {
            setError("Todos los campos son obligatorios.");
            return false;
        }
        setError('');
        return true;
    };

    return { proveedor, error, handleInputChange, validateForm };
};

export default useProveedorForm;
