import {
  orderAlphabetically,
  filterBreedsCreated,
  filterBreedsByTemperament,
  orderByWeight,
} from "../../features/breedsSlice";
import "./Filters.scss";
import swal from "sweetalert";
import { temperamentsFetch } from "../../features/TemperamentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const Filters = ({ setCurrentPage, setOrder, order, currentBreeds }) => {
  const dispatch = useDispatch();
  const allTemperaments = useSelector(
    (state) => state.temperaments.temperaments
  );

  const temperamentsStatus = useSelector((state) => state.temperaments.status);
  const error = useSelector((state) => state.temperaments.error);

  const handleOrderBreedsAlphabetically = (e) => {
    e.preventDefault();
    dispatch(orderAlphabetically(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  };
  const handleOrderBreedsByWeight = (e) => {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
    console.log(order);
  };
  const handleFilterBreedsByTemperament = (e) => {
    e.preventDefault();
    dispatch(filterBreedsByTemperament(e.target.value));
    setCurrentPage(1);
  };
  const handleFilterBreedsCreated = async (e) => {
    e.preventDefault();
    const filterCreated = currentBreeds.filter((b) => b.createdInDB);
    console.log(e.target.value);
    if (e.target.value === " created") {
      if (!filterCreated.length) {
        await swal("Error, there are not created");
      } else {
        dispatch(filterBreedsCreated(e.target.value));
        setCurrentPage(1);
      }
    } else {
      dispatch(filterBreedsCreated(e.target.value));
      setCurrentPage(1);
    }
  };
  useEffect(() => {
    if (temperamentsStatus === "idle") {
      dispatch(temperamentsFetch());
    }
  }, [temperamentsStatus, dispatch]);
  if (temperamentsStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (temperamentsStatus === "failed") {
    return <div>{error}</div>;
  }
  return (
    <div className="containerFilter">
      <select
        onChange={(e) => {
          handleOrderBreedsAlphabetically(e);
        }}
        className="selectFilter"
      >
        <option value="default" className="selectFilter" disabled="disabled">
          Order alphabetically
        </option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select
        onChange={(e) => {
          handleOrderBreedsByWeight(e);
        }}
        className="selectFilter"
      >
        <option value="default" disabled="disabled">
          Order by weight
        </option>
        <option value="asc" className="selectFilter">
          min weight
        </option>
        <option value="desc" className="selectFilter">
          max weight
        </option>
      </select>

      <select
        className="selectFilter"
        onChange={(e) => {
          handleFilterBreedsByTemperament(e);
        }}
      >
        <option value="default" className="selectFilter" disabled="disabled">
          Select temperament
        </option>
        <option value="all" className="selectFilter">
          all
        </option>
        {allTemperaments?.map((temperament, index) => {
          return (
            <option
              className="selectFilter"
              value={temperament.name}
              key={index}
            >
              {temperament.name.toLowerCase()}
            </option>
          );
        })}
      </select>
      <select
        onChange={(e) => {
          handleFilterBreedsCreated(e);
        }}
        className="selectFilter"
      >
        <option value="all">all</option>
        <option value="created">created</option>
        <option value="api">api</option>
      </select>
    </div>
  );
};

export default Filters;
