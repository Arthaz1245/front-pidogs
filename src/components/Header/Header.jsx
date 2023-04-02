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
      <div></div>

      <Link to={"/home"}>
        <span>Doggis</span>
      </Link>
      {auth._id ? (
        <div>
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
          <button className="cart-login" onClick={() => navigate("/login")}>
            Login to Check out
          </button>
          <Link to={"/login"}> Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
