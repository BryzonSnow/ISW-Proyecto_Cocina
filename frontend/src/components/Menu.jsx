import MenuCard from "./MenuCard"; // Importa el componente de las cards
import "../styles/Menu.css"; // Archivo CSS para estilos personalizados
import { useState, useEffect } from "react"; // Importa el hook useState
import { getPlatos } from "../services/plato.service";
import Cookies from "js-cookie";

// Componente de la página de menú
const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

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
    

  const payloadCookie = Cookies.get("payload");
  console.log("Cookie de payload:", payloadCookie);
    if (payloadCookie) {
      try {
        const payload = JSON.parse(payloadCookie);
        setIsAdmin(payload.rol === "administrador");
      } catch (error) {
        console.error("Error al parsear el payload:", error);
      }
    }

    fetchMenuItems();
  }, []);

  return (
    <div className="menu-container">
      {isAdmin && (
        <div style={{ margin: "1px 0", textAlign: "left" }}>
          <a href="http://localhost:5173/gestionmenu">
            <button
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Gestionar Menú
            </button>
          </a>
        </div>
      )}
      <div className="menu-grid gap-x-10">
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
};

export default Menu;
