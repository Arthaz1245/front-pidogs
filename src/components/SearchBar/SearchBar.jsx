import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  // cleanBreeds,
  dogsFetch,
  searchBreed,
} from "../../features/breedsSlice";
const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(cleanBreeds());
    dispatch(searchBreed(name));

    setName("");
  };
  const handleReload = (e) => {
    e.preventDefault();
    dispatch(dogsFetch());
    setCurrentPage(1);
  };
  return (
    <div>
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
          className="searchBar"
          onChange={(e) => {
            handleInputChange(e);
          }}
          value={name}
        />
        <button type="submit" className="btnSubmit">
          Search
        </button>
      </form>
      <button onClick={(e) => handleReload(e)}>Reload</button>
    </div>
  );
};

export default SearchBar;
