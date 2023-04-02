import { dogsFetchById, dogsFetch } from "../../features/breedsSlice";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cleanBreedDetails, deleteBreed } from "../../features/breedsSlice";
import "./BreedDetails.scss";
const BreedDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const breedsById = useSelector((state) => state.breeds.breedsById);

  useEffect(() => {
    dispatch(dogsFetchById(id));

    return () => {
      dispatch(cleanBreedDetails(id));
    };
  }, [dispatch, id]);
  const handleDelete = (e) => {
    e.preventDefault();
    //dispatch(cleanBreeds());
    dispatch(deleteBreed(breedsById._id));
    navigate("/home");
    dispatch(dogsFetch());
  };

  return (
    <div className="breedDetail">
      {breedsById.createdInDB ? (
        <div className="container">
          {Object.values(breedsById).length !== 0 ? (
            <div className="cardDetail">
              <img src={breedsById.image} className="cardImage" alt="" />
              <div className="titlediv">
                <h2 className="titleNameBreed">{breedsById.name}</h2>
              </div>
              <div className="titleTem">
                <h5 className="h5tem">Temperaments</h5>
              </div>
              <div className="allTemps">
                {breedsById.temperaments?.map((t, k) => {
                  return (
                    <div key={k}>
                      {t.name ? (
                        <div className="eachTempDiv">
                          <p className="eachTemperament">{t.name}</p>
                        </div>
                      ) : (
                        <div className="eachTempDiv">
                          <p className="eachTemperament">{t}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="table2">
                <div className="rowt">
                  <h5 style={{ color: "#AC3B61" }}>
                    min_height:{" "}
                    <span style={{ color: "#123C69" }}>
                      {breedsById.min_height}
                    </span>
                  </h5>
                  <h5 style={{ color: "#AC3B61" }}>
                    max_height:{"  "}
                    <span style={{ color: "#123C69" }}>
                      {breedsById.max_height}
                    </span>
                  </h5>
                </div>
                <div className="rowt">
                  <h5 style={{ color: "#AC3B61" }}>
                    min_weight:{" "}
                    <span style={{ color: "#123C69" }}>
                      {breedsById.min_weight}
                    </span>
                  </h5>
                  <h5 style={{ color: "#AC3B61" }}>
                    max_weight:{" "}
                    <span style={{ color: "#123C69" }}>
                      {breedsById.max_weight}
                    </span>
                  </h5>
                </div>
                <div className="rowt">
                  <h5 style={{ color: "#AC3B61" }}>
                    min_lifespan:{" "}
                    <span style={{ color: "#123C69" }}>
                      {breedsById.min_lifespan}
                    </span>
                  </h5>
                  <h5 style={{ color: "#AC3B61" }}>
                    max_lifespan:{" "}
                    <span style={{ color: "#123C69" }}>
                      {breedsById.max_lifespan}
                    </span>
                  </h5>
                </div>
              </div>
              <div>
                <Link to={`/home/update/${id}`}>
                  <button className="modifyCard">Modify</button>
                </Link>
              </div>
              <div>
                <button onClick={(e) => handleDelete(e)}>delete</button>
              </div>
            </div>
          ) : (
            <div>
              <p>Loading...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          {Object.values(breedsById).length !== 0 ? (
            <div className="cardDetail">
              <img src={breedsById.image} className="cardImage" alt="" />
              <div className="titlediv">
                <h2 className="titleNameBreed">{breedsById.name}</h2>
              </div>
              <div className="titleTem">
                <h5 className="h5tem">Temperaments</h5>
              </div>

              <div className="allTemps">
                {breedsById.temperaments?.map((t, k) => {
                  return (
                    <div key={k}>
                      {t.name ? (
                        <div className="eachTempDiv">
                          <p className="eachTemperament">{t.name}</p>
                        </div>
                      ) : (
                        <div className="eachTempDiv">
                          <p className="eachTemperament">{t}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="table2">
                <div className="rowt">
                  <h5 style={{ color: "#AC3B61" }}>
                    min_height:
                    <span style={{ color: "#123C69" }}>
                      {" "}
                      {breedsById.min_height}
                    </span>
                  </h5>
                  <h5 style={{ color: "#AC3B61" }}>
                    max_height:{" "}
                    <span style={{ color: "#123C69" }}>
                      {breedsById.max_height}
                    </span>
                  </h5>
                </div>
                <div className="rowt">
                  <h5 style={{ color: "#AC3B61" }}>
                    min_weight:{" "}
                    <span style={{ color: "#123C69" }}>
                      {breedsById.min_weight}{" "}
                    </span>
                  </h5>
                  <h5 style={{ color: "#AC3B61" }}>
                    max_weight:{" "}
                    <span style={{ color: "#123C69" }}>
                      {breedsById.max_weight}
                    </span>
                  </h5>
                </div>
                <div className="rowt">
                  <h5 style={{ color: "#AC3B61" }}>
                    min_lifespan:{" "}
                    <span style={{ color: "#123C69" }}>
                      {breedsById.min_lifespan}
                    </span>
                  </h5>
                  <h5 style={{ color: "#AC3B61" }}>
                    max_lifespan:{" "}
                    <span style={{ color: "#123C69" }}>
                      {breedsById.max_lifespan}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>Loading...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BreedDetails;
