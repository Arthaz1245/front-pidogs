import "./Favorites.scss";
import { removeFavoriteBreed } from "../../features/authSlice";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const Favorites = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleDeleteFavorite = (breed) => {
    const payload = {
      breed: breed,
      userId: auth._id,
    };
    dispatch(removeFavoriteBreed(payload));
  };
  return (
    <div className="favorite-breeds">
      {auth.favorites.length ? (
        <>
          {auth.favorites.map((favorite, index) => (
            <div key={index} className="favorite-breed">
              <h1 className="nameh1">{favorite.name}</h1>
              <Link to={`/home/${favorite.id}`}>
                <img
                  src={favorite.image}
                  alt={favorite.name}
                  className="img-favorite"
                />
              </Link>
              <button
                onClick={() => handleDeleteFavorite(favorite)}
                className="btn-remove-favorites"
              >
                Delete
              </button>
            </div>
          ))}
        </>
      ) : (
        <div>
          <p>There are not favorites add</p>
          {console.log(auth.favorites)}
        </div>
      )}
    </div>
  );
};

export default Favorites;
