import { useState } from "react";
import "./Register.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="register-button">
          {auth.registerStatus === "pending" ? "Submitting" : "Register"}
        </button>
        {auth.registerStatus === "rejected" ? (
          <p className="register-error">{auth.registerError}</p>
        ) : null}
      </form>
    </div>
  );
};

export default Register;
