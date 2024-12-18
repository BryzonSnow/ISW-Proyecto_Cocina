import { createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const empleado = JSON.parse(sessionStorage.getItem("empleado")) || "";
    const isAuthenticated = !!empleado; // Simplificación de validación

    useEffect(() => {
        console.log("Empleado:", empleado);
        if (!isAuthenticated) {
            navigate("/"); // Redirigir si no está autenticado
            console.log("No hay empleado logueado");
        }
    }, [isAuthenticated, navigate, empleado]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, empleado }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar el contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext };