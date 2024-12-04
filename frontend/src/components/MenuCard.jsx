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
            {isAvailable ? `$ ${price} CLP` : <del>$ {price} CLP</del>}
          </span>
          {!isAvailable && <span className="menu-card__status">No Disponible</span>}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
