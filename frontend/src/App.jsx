import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Ingrediente from './components/Ingrediente'; 
import Inventario from './components/Inventario';
import Inicio from './components/Inicio';
import Menu from './components/Menu';
import WspBubble from './components/wspbubble';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/Ingrediente" element={<Ingrediente />} />
        <Route path="/Inventario" element={<Inventario />} />
      </Routes>
      <Footer />
      <WspBubble />
    </Router>
  );
};

export default App;
