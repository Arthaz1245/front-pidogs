import "./Card.scss";
const Card = ({
  image,
  name,
  min_weight,
  max_weight,
  min_height,
  max_height,
  min_lifespan,
  max_lifespan,
  temperaments,
}) => {
  return (
    <div className="breed-card">
      <img src={image} alt={name} className="breed-image" />
      <h2 className="breed-name">{name}</h2>
      <div className="breed-details">
        <div className="detail">
          <span className="label">Height:</span>
          {min_height} - {max_height} cm
        </div>
        <div>
          <span className="label">Weight:</span>
          {min_weight} - {max_weight} kg
        </div>
        <div className="detail">
          <span className="label">Lifespan:</span>
          {min_lifespan} - {max_lifespan} years
        </div>
        <div className="detail">
          <span className="label">Temperaments:</span>
          {typeof temperaments === "string"
            ? temperaments
            : temperaments.map((temperament) => temperament.name).join(", ")}
        </div>
      </div>
    </div>
  );
};

export default Card;
