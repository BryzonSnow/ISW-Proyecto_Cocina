import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Ingrediente from './components/Ingrediente'; 
import Inicio from './components/Inicio';
import Menu from './components/Menu';
import Inventario from './components/Inventario';
import WspBubble from './components/wspbubble';
import Footer from './components/Footer';
import Gestionmenu from './components/Gestionmenu';
import Proveedor from './components/Proveedores';

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
      </Routes>
      <Footer />
      <WspBubble />
    </Router>
  );
};

export default App;
