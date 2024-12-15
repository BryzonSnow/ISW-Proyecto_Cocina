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
        console.log(data); // Revisar la estructura de los datos
      const dataIds = data.map((item, index) => ({
        ...item,
        id: item.id || index, // Usa item.id si existe, de lo contrario el índice
      }));
      setMenuItems(dataIds);
    }
    fetchMenuItems();
  }, []);


  return (
    <div className="menu-container">
      <div style={{ margin: '1px 0', textAlign: 'left' }}>
        <a href="http://localhost:5173/gestionmenu">
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
          >Gestionar Menú</button>
        </a>
      </div>
      <h1 style={{ fontSize: '2em' }}>Pizzas</h1>
      <div className="menu-grid gap-x-10" >
        {menuItems.map((item) => (
          <MenuCard
            key={item.id}
            title={item.nombre}
            description={item.descripcion}
            price={Number(item.precio)} // Convierte el precio a número
            isAvailable={item.disponibilidad}
          />
        ))}
      </div>
    </div>
    );
  }

export default Menu;
