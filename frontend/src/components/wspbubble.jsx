import '../styles/wspbubble.css'; // Estilos separados para el botón

const wspbubble = () => {
  return (
    <a 
      href="https://www.whatsapp.com/?lang=es_LA" // Reemplaza con tu número de WhatsApp
      className="whatsapp-float" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp" 
        className="whatsapp-icon"
      />
    </a>
  );
};

export default wspbubble;
