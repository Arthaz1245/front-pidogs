import "./Card.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavoriteBreed,
  removeFavoriteBreed,
} from "../../features/authSlice";
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
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const active = auth.favorites.includes(id);
  const handleFavoriteClick = () => {
    const payload = {
      breedId: id,
      userId: auth._id,
    };
    const included = auth.favorites.includes(id);
    included && dispatch(removeFavoriteBreed(payload));
    !included && dispatch(addFavoriteBreed(payload));
  };

  return (
    <div className="breed-card">
      {auth._id ? (
        <>
          <Link to={`/home/${id}`} className="Linkt">
            <img src={image} alt={name} className="breed-image" />
          </Link>
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

          <button
            className={active ? "btnFavoritesRemove" : "btnFavorites"}
            onClick={handleFavoriteClick}
          >
            +
          </button>
        </>
      ) : (
        <>
          <Link to={`/home/${id}`} className="Linkt">
            <img src={image} alt={name} className="breed-image" />
          </Link>
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
        </>
      )}
    </div>
  );
};

export default Card;
