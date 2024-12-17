import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Ingrediente from './components/Ingrediente'; 
import Inventario from './components/Inventario';
import Inicio from './components/Inicio';
import Menu from './components/Menu';
import WspBubble from './components/wspbubble';
import Footer from './components/Footer';
import Gestionmenu from './components/Gestionmenu';
import Proveedores from './components/Proveedores';
import Pedido from './components/Pedido';
import Cliente from './components/Cliente';
import Empleado from './components/Empleado';
import VerPedidos from './components/VerPedidos';
import Perfil from './components/Perfil';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gestionmenu" element={<Gestionmenu />} />
        <Route path="/Ingrediente" element={<Ingrediente />} />
        <Route path="/Inventario" element={<Inventario />} />
        <Route path="/proveedor" element={<Proveedores />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/clientes" element={<Cliente />} />
        <Route path="/empleados" element={<Empleado />} />
        <Route path="/verpedidos" element={<VerPedidos />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
      <Footer />
      <WspBubble />
    </Router>
  );
};

export default App;
