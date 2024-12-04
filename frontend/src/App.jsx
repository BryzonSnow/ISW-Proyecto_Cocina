import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Ingrediente from './components/Ingrediente'; 
import Inicio from './components/Inicio';
import Menu from './components/Menu';
import Inventario from './components/Inventario';
import Proveedores from './components/Proveedores';
import WspBubble from './components/wspbubble';
import Footer from './components/Footer';
import Gestionmenu from './components/Gestionmenu';
import Proveedor from './components/Proveedores';
import Cliente from './components/Cliente';
import VerPedidos from './components/VerPedidos';
import Pedido from './components/Pedido';
import Empleado from './components/Empleados';

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
        <Route path="/proveedor" element={<Proveedor />} />
        <Route path="/clientes" element={<Cliente />} />
        <Route path="/verpedido" element={<VerPedidos />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/empleado" element={<Empleado />} />

      </Routes>
      <Footer />
      <WspBubble />
    </Router>
  );
};

export default App;
