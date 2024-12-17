import MenuCard from "./MenuCard";
import "../styles/Menu.css";
import { useState, useEffect } from "react";
import { getPlatos } from "../services/plato.service";
import Cookies from "js-cookie";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchMenuItems() {
      const data = await getPlatos();
      const dataIds = data.map((item, index) => ({
        ...item,
        id: item.id || index,
      }));
      setMenuItems(dataIds);
    }

    const payloadCookie = Cookies.get("payload");
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

  // Filtrar ensaladas
  const ensaladas = menuItems.filter((item) =>
    item.nombre.toLowerCase().includes("ensalada")
  );

// Filtar postres
  const postres = menuItems.filter((item) =>
    item.nombre.toLowerCase().includes("postre")
  );

  // Filtrar el resto de los platos
  const otrosPlatos = menuItems
    .filter((item) => !item.nombre.toLowerCase().includes("ensalada"))
    .filter((item) => !item.nombre.toLowerCase().includes("postre"))
    .sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar alfabéticamente

  return (
    <div className="menu-container">
      {/* Botón de gestionar menú para administradores */}
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

{/* Sección para Otros Platos */}
<h2 className="section-title"></h2>
      <div className="menu-grid gap-x-10">
        {otrosPlatos.map((item) => (
          <MenuCard
            key={item.id}
            title={item.nombre}
            description={item.descripcion}
            price={Number(item.precio)}
            isAvailable={item.disponibilidad}
          />
        ))}
      </div>

      {/* Sección para Ensaladas */}
      <h2 className="section-title large-title">Ensaladas</h2>
      <div className="menu-grid gap-x-10">
        {ensaladas.map((item) => (
          <MenuCard
            key={item.id}
            title={item.nombre}
            description={item.descripcion}
            price={Number(item.precio)}
            isAvailable={item.disponibilidad}
          />
        ))}
      </div>
        
      {/* Sección para Postres */}
      <h2 className="section-title">Postres</h2>
      <div className="menu-grid gap-x-10">
        {postres.map((item) => (
          <MenuCard
            key={item.id}
            title={item.nombre}
            description={item.descripcion}
            price={Number(item.precio)}
            isAvailable={item.disponibilidad}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
