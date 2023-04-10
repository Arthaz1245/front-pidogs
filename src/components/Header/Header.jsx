import "./Header.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/authSlice";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <header className="headerStyle">
      <div className="homeLink">
        <Link to={"/home"} className="homeTitle">
          <span>Doggis</span>
        </Link>
      </div>

      {auth._id ? (
        <div className="MenuBtn">
          <Link to={"/favorites"} className="favoritesLink">
            Favorites
          </Link>
          <Link to={"/create"}>
            <button className="bntCreateBreed">Create Breed</button>
          </Link>
          <button
            className="logoutBtn"
            onClick={() => {
              dispatch(logoutUser(null));
              navigate("/home");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="auth">
          <Link to={"/login"} className="loginLink">
            {" "}
            Login
          </Link>
          <Link to={"/register"} className="registerLink">
            Register
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
