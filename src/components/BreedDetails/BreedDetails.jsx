import { dogsFetchById } from "../../features/breedsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const BreedDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const breedsById = useSelector((state) => state.breeds.breedsById);

  useEffect(() => {
    dispatch(dogsFetchById(id));
    // return () => {
    //   dispatch(cleanBreedDetails(dispatch), cleanBreeds(dispatch));
    // };
  }, [dispatch, id]);

  return (
    <div className="breedDetail">
      <div className="container">
        {Object.values(breedsById).length !== 0 ? (
          <div className="cardDetail">
            <img src={breedsById.image} className="cardImage" alt="" />
            <h2 className="titleNameBreed">{breedsById.name}</h2>

            <div className="allTemps">
              <h5 className="h5tem">Temperaments</h5>
              {breedsById.temperaments?.map((t, k) => {
                return (
                  <div key={k}>
                    {t.name ? (
                      <p className="eachTemperament">{t.name}</p>
                    ) : (
                      <p className="eachTemperament">{t}</p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="table2">
              <h5>min_height: {breedsById.min_height}</h5>
              <h5>max_height: {breedsById.max_height}</h5>
              <h5>min_weight: {breedsById.min_weight}</h5>
              <h5>max_weight: {breedsById.max_weight}</h5>
              <h5>min_lifespan: {breedsById.min_lifespan}</h5>
              <h5>max_lifespan: {breedsById.max_lifespan}</h5>
            </div>
          </div>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreedDetails;
