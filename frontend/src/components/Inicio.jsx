import '../styles/Inicio.css'; // Archivo CSS para estilos personalizados

const Inicio = () => {
  return (
    <section className="inicio">
      <div className="inicio__hero">
        <div className="inicio__overlay"></div>
        <div className="inicio__content">
          <h1 className="inicio__title" style={{ fontFamily: 'Newsreader, serif' }}>Bienvenidos a nuestro Restaurante</h1>
          <p className="inicio__subtitle" style={{ fontFamily: 'Newsreader, serif' }}>
            Bienvenidos a una experiencia culinaria donde cada plato cuenta una historia de tradición y sabor único.
            <br />
            ¡Descubre el arte de comer bien!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Inicio;