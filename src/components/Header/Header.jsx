import "./Header.scss";

import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="headerStyle">
      <Link to={"/home/create"}>
        <button className="bntCreateBreed">Create Breed</button>
      </Link>
    </header>
  );
};

export default Header;
