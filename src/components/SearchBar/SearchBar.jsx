import { useDispatch } from "react-redux";
import "./SearchBar.scss";
import { useState } from "react";
import swal from "sweetalert";

import {
  // cleanBreeds,
  dogsFetch,
  searchBreed,
} from "../../features/breedsSlice";
const SearchBar = ({ setCurrentPage, currentBreeds }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isInit = currentBreeds.filter(
      (b) => b.name.toLowerCase() === name.toLowerCase()
    );
    if (!isInit.length) {
      await swal("Breed Not Found", "The breed does not exist", "error");
      dispatch(dogsFetch());
      setCurrentPage(1);
      setName("");
    } else {
      dispatch(searchBreed(name));
      setName("");
    }
  };
  const handleReload = (e) => {
    e.preventDefault();
    dispatch(dogsFetch());
    setCurrentPage(1);
  };
  return (
    <div className="search-bar-container">
      {" "}
      <form
        className="form-search"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="Search breed..."
          className="search-bar-input"
          onChange={(e) => {
            handleInputChange(e);
          }}
          value={name}
        />
        <button type="submit" className="search-bar-btn-submit">
          Search
        </button>
      </form>
      <button
        onClick={(e) => handleReload(e)}
        className="search-bar-btn-reload"
      >
        Reload
      </button>
    </div>
  );
};

export default SearchBar;
