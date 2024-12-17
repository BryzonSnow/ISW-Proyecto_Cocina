import { Routes, Route } from 'react-router-dom';  // No es necesario importar BrowserRouter aquí
import Navbar from './components/Navbar';
import Ingrediente from './components/Ingrediente'; 
import Inicio from './components/Inicio';
import Menu from './components/Menu';
import Inventario from './components/Inventario';
import WspBubble from './components/wspbubble';
import Footer from './components/Footer';
import Gestionmenu from './components/Gestionmenu';
import Proveedores from './components/Proveedores';
import Pedido from './components/Pedido';
import Cliente from './components/Cliente';
import Empleado from './components/Empleado';
import VerPedidos from './components/VerPedidos';
import PrivateRoute from './components/PrivateRoute';  // Importa el PrivateRoute
import { useAuth } from '@context/AuthContext';  // Asegúrate de que el hook useAuth esté configurado

const App = () => {
  const { isAuthenticated } = useAuth();  // Obtén el estado de autenticación global

  return (
    <>
      <Navbar />
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Inicio />} />
        
        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/gestionmenu" element={<Gestionmenu />} />
          <Route path="/ingrediente" element={<Ingrediente />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/proveedor" element={<Proveedores />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/clientes" element={<Cliente />} />
          <Route path="/empleados" element={<Empleado />} />
          <Route path="/verpedidos" element={<VerPedidos />} />
        </Route>

        {/* Otras rutas públicas si es necesario */}
        {/* <Route path="/auth" element={<Login />} />  Este sería tu login */} 
      </Routes>
      <Footer />
      <WspBubble />
    </>
  );
};

export default App;

