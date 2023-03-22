import CardsBreeds from "../CardsBreeds/CardsBreeds";
import "./Home.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dogsFetch } from "../../features/breedsSlice";
const Home = () => {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.breeds.breeds);
  const breedsStatus = useSelector((state) => state.breeds.status);
  const error = useSelector((state) => state.breeds.error);

  useEffect(() => {
    if (breedsStatus === "idle") {
      dispatch(dogsFetch());
    }
  }, [breedsStatus, dispatch]);
  if (breedsStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (breedsStatus === "failed") {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div className="breedCards">
        <CardsBreeds breeds={breeds} />
      </div>
    </div>
  );
};

export default Home;
