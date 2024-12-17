import PropTypes from 'prop-types';
import '../styles/MenuCard.css';

const MenuCard = ({ title, description, price, isAvailable }) => {
  return (
    <div className={`menu-card ${!isAvailable ? 'menu-card--unavailable' : ''}`}>
      <div className="menu-card__info">
        <h3 className="menu-card__title">{title}</h3>
        <p className="menu-card__description">{description}</p>
        <div className="menu-card__footer">
          <span className="menu-card__price">
            {isAvailable ? `$ ${price} CLP` : <del>$ {price} CLP</del>}
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
    isAvailable: PropTypes.bool.isRequired,   
  };

export default MenuCard;
