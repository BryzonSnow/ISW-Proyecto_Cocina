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
            price={item.precio}
            isAvailable={item.disponibilidad}
          />
        ))}
      </div>
    </div>
    );
  }



//const menuBebidaItems = [
//  {
//    id: 7,
//    title: 'Coca Cola',
//    description: 'Bebida gaseosa de cola.',
//    price: 1000,
//    image: 'https://static.salcobrandonline.cl/spree/products/36375/large_webp/8971600.webp?1641477356',
//    isAvailable: true,
// },
//  {
//    id: 8,
//    title: 'Fanta',
//    description: 'Bebida gaseosa de naranja.',
//    price: 1000,
//    image: 'https://brindo.cl/15-thickbox_default/1x-fanta-lata-350cc.jpg',
//    isAvailable: true,
//  },
//  {
//  id: 9,
//    title: 'Sprite',
//    description: 'Bebida gaseosa de limón.',
//    price: 1000,
//    image: 'https://www.distribuidoralamartina.cl/wp-content/uploads/2021/04/sprite-origianl-lata-330ml-min.png',
//    isAvailable: true,
//  },
//  {
//    id: 10,
//    title: 'Agua Mineral',
//    description: 'Agua mineral sin gas.',
//    price: 800,
//    image: 'https://prisa.cl/media/cache/attachment/filter/product_gallery_main/b6b1adc76b36bd6a7f81344215e93277/144922/Prisa-65254a9542780488932197.png',
//    isAvailable: true,
//  },
  // Poner mas bebidas aquí

//];

{/*      <h1 style={{ fontSize: '2em' }}>Bebidas</h1>
      <div className="menu-grid">
        {menuBebidaItems.map((item) => (
          <MenuCard
            key={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            image={item.image}
            isAvailable={item.isAvailable}
          />
        ))}
      </div>
*/}

export default Menu;
