import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (e) => {
    setIsModalOpen(!isModalOpen);
    if (e.target.className === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__brand">
          <h1 style={{ fontFamily: "Newsreader, serif" }}>Restaurante</h1>
        </div>
        
        
        <div className="navbar__right"> {/*Aquí se agregaron las opciones de Quiénes somos, Dirección, Comentarios y Perfil*/}
          <div className="navbar__user-options">
            <a href="/Nosotros">Quiénes somos</a>
            <a href="/Dirección">Dirección</a>
            <a href="/Comentarios">Comentarios</a>
            <a href="/perfil">Perfil</a>
            {/* Botón para abrir el modal */}
            <button className="navbar__login" onClick={toggleModal}>Login</button>
          </div>
          {/*<div className="navbar__theme-switch">
            <input
              type="checkbox"
              id="themeToggle"
              className="navbar__toggle"
            />
            <label htmlFor="themeToggle" className="navbar__slider"></label>
          </div>
          */}
        </div>
      </nav>
      <nav>
      <ul className="navbar__links">
          <li>
            <Link to="/" style={{ fontFamily: 'Newsreader, serif', fontSize: '1.4rem' }}>Inicio</Link>
          </li>
          <li>
            <Link to="/menu" style={{ fontFamily: 'Newsreader', fontSize: '1.4rem' }}>Menú</Link>
          </li>
          <li>
            <Link to="/pedidos" style={{ fontFamily: 'Newsreader, serif', fontSize: '1.4rem' }}>Pedidos</Link>
          </li>
          <li>
            <Link to="/ingrediente" style={{ fontFamily: 'Newsreader, serif', fontSize: '1.4rem' }}>Ingredientes</Link>
          </li>
          <li>
            <Link to="/turnos" style={{ fontFamily: 'Newsreader, serif', fontSize: '1.4rem' }}>Turnos</Link>
          </li>
          <li>
            <Link to="/proveedor" style={{ fontFamily: 'Newsreader, serif', fontSize: '1.4rem' }}>Proveedores</Link>
          </li>
        </ul>
      </nav>


      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Iniciar sesión</h2>
            <form>
              <input
                type="username"
                id="username"
                name="username"
                placeholder="username"
                required
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required
              />

              <button type="submit">Login</button>
            </form>
            {/* Botón para cerrar el modal */}
            <button className="modal-close" onClick={toggleModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
