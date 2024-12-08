import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// Hook para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const storedUser = JSON.parse(sessionStorage.getItem('usuario'));
            if (storedUser) {
                setUser(storedUser);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            setIsAuthenticated(false);
        }
        setLoading(false); // Ya terminamos de verificar el estado
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth'); // Redirigir si no está autenticado
        }
    }, [isAuthenticated, navigate]);

    if (loading) {
        return <div>Cargando...</div>; // Puedes mostrar un "Cargando..." mientras verificas el estado
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    );
}
