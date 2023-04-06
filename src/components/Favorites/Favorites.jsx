import "./Favorites.scss";
import { removeFavoriteBreed } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";
const Favorites = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleDeleteFavorite = (id) => {
    // const payload = {
    //   breedId: id,
    //   userId: auth._id,
    // };
    // dispatch(removeFavoriteBreed(payload));
    console.log(auth);
  };
  return (
    <div>
      {auth.favorites.length ? (
        <>
          {auth.favorites.map((favorite, index) => (
            <div key={index}>
              <h1>{favorite.name}</h1>
              <img src={favorite.image} alt={favorite.name} />
              <button onClick={() => handleDeleteFavorite(favorite._id)}>
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
