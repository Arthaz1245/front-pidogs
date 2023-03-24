import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchBreed } from "../../features/breedsSlice";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = "";

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchBreed(name));
    setName("");
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
    </div>
  );
};

export default SearchBar;
