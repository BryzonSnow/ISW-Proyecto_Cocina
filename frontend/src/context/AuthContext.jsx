import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
    const isAuthenticated = user ? true : false;

useEffect(() => {
    console.log('Usuario:', user);
    if (!isAuthenticated) {
        navigate('/');
        console.log('No hay usuario logueado');
    }
}, [isAuthenticated, navigate]);

return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
        {children}
    </AuthContext.Provider>
);
}