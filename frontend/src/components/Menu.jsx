import MenuCard from './MenuCard'; // Importa el componente de las cards
import '../styles/Menu.css'; // Archivo CSS para estilos personalizados
import { useState, useEffect } from 'react'; // Importa el hook useState
import { getPlatos } from '../services/plato.service';

// Componente de la página de menú
const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      const data = await getPlatos();
      setMenuItems(data);
    }
    fetchMenuItems();
  }, []);

  return (
    <div className="menu-container">
    <div style={{ margin: '1px 0', textAlign: 'left' }}>
      <a href="http://146.83.198.35:1327/gestionmenu">
        <button
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Gestionar Menú
        </button>
      </a>
    </div>
    <h1 style={{ fontSize: '2em' }}>Pizzas</h1>
    <div className="menu-grid gap-x-10">
      {/* Verificar que menuItems sea un array antes de mapear */}
      {Array.isArray(menuItems) && menuItems.length > 0 ? (
        menuItems.map((item) => (
          <MenuCard
            key={item.id}
            title={item.nombre}
            description={item.descripcion}
            price={item.precio}
            isAvailable={item.disponibilidad}
          />
        ))
      ) : (
        <p>No hay items en el menú disponibles.</p>
      )}
    </div>
  </div>
    );
  }

export default Menu;
