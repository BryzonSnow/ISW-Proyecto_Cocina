import MenuCard from './MenuCard'; // Importa el componente de las cards
import '../styles/Menu.css'; // Archivo CSS para estilos personalizados


const menuItems = [
  {
    id: 1,
    title: 'Pizza Caprese',
    description: 'La pizza Capresse combina tomate fresco, mozzarella, albahaca, y un toque de aceite de oliva, resaltando sabores simples y mediterráneos.',
    price: 12000,
    image: 'https://lofficinadelgusto.com/wp-content/uploads/2021/10/Pizza-Napolitana-370x247.jpg', // Usa una URL o una imagen local
    isAvailable: true,
  },
  {
    id: 2,
    title: 'Pizza Pepperoni',
    description: 'La pizza de pepperoni lleva salsa de tomate, queso mozzarella derretido y rodajas de pepperoni crujiente para un toque sabroso y picante.',
    price: 12000,
    image: 'https://cdn.unotv.com/images/2024/09/pizza-pepperoni-no-existe-italia-152140-1024x576.jpeg',
    isAvailable: false,
  },
  {
    id: 3,
    title: 'Pizza Margherita',
    description: 'Pizza clásica con tomate, mozzarella y albahaca fresca.',
    price: 11000,
    image: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/5802fab5-fdce-468a-a830-43e8001f5a72/Derivates/c00dc34a-e73d-42f0-a86e-e2fd967d33fe.jpg',
    isAvailable: true,
  },
  {
    id: 4,
    title: 'Pizza Hawaiana',
    description: 'Pizza con jamón, piña y queso mozzarella.',
    price: 13000,
    image: 'https://i1.sndcdn.com/artworks-000519659793-wc9vfc-t500x500.jpg',
    isAvailable: true,
  },
  {
    id: 5,
    title: 'Pizza Cuatro Quesos',
    description: 'Pizza con una mezcla de mozzarella, gorgonzola, parmesano y queso de cabra.',
    price: 14000,
    image: 'https://www.hola.com/horizon/landscape/e8bb41b65869-pizzacuatroquesos-adob-t.jpg',
    isAvailable: true,
  },
  {
    id: 6,
    title: 'Pizza Vegetariana',
    description: 'Pizza con una variedad de vegetales frescos y queso mozzarella.',
    price: 12500,
    image: 'https://www.revistapancaliente.co/wp-content/uploads/2024/09/Pizza_vegetariana.jpg',
    isAvailable: true,
  },
  // Poner mas platos aquí
];

const Menu = () => {
  return (
    <div className="menu-container">
      <h1 style={{ fontSize: '2em' }}>Menú</h1>
      <div className="menu-grid">
        {menuItems.map((item) => (
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
    </div>
  );
};

export default Menu;
