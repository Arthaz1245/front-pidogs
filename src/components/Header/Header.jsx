import "./Header.scss";

import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="headerStyle">
      <div>
        <Link to={"/home/create"}>
          <button className="bntCreateBreed">Create Breed</button>
        </Link>
      </div>

      <Link to={"/home"}>
        <span>Doggis</span>
      </Link>
    </header>
  );
};

export default Header;
