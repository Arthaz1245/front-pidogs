import "./Card.scss";

import { Link } from "react-router-dom";
const Card = ({
  id,
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
      <Link to={`/${id}`} className="Linkt">
        <img src={image} alt={name} className="breed-image" />
        <h2 className="breed-name">{name}</h2>
        <div className="breed-details">
          <div className="detail">
            <span className="label">Height:</span>
            {min_height} - {max_height} cm
          </div>
          <div className="detail">
            <span className="label">Weight:</span>
            {min_weight} - {max_weight} kg
          </div>
          <div className="detail">
            <span className="label">Lifespan:</span> {min_lifespan} -{" "}
            {max_lifespan} years
          </div>
          <div className="temperamentDetail">
            <span className="label">Temperaments:</span>
            <div className="divList">
              <p className="temperamentList">
                {typeof temperaments === "string"
                  ? temperaments
                  : temperaments
                      .map((temperament, k) =>
                        temperament.name ? temperament.name : temperament
                      )

                      .join(", ")}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
