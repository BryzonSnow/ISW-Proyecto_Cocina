import PropTypes from 'prop-types';
import '../styles/MenuCard.css';

const MenuCard = ({ title, description, price, image, isAvailable }) => {
  return (
    <div className={`menu-card ${!isAvailable ? 'menu-card--unavailable' : ''}`}>
      <img src={image} alt={title} className="menu-card__image" />
      <div className="menu-card__info">
        <h3 className="menu-card__title">{title}</h3>
        <p className="menu-card__description">{description}</p>
        <div className="menu-card__footer">
          <span className="menu-card__price">
            {isAvailable ? `$ ${price}` : <del>$ {price}</del>}
          </span>
          {!isAvailable && <span className="menu-card__status">No Disponible</span>}
        </div>
      </div>
    </div>
  );
};

// Validación de props con PropTypes
MenuCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired, 
    price: PropTypes.number.isRequired,       
    image: PropTypes.string.isRequired,       
    isAvailable: PropTypes.bool.isRequired,   
  };

export default MenuCard;
