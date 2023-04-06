import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/Layout/Layout";
import LandingPage from "./components/LandingPage/LandingPage";
import BreedDetails from "./components/BreedDetails/BreedDetails";
import UpdateBreed from "./components/UpdateBreed/UpdateBreed";
import CreateBreed from "./components/CreateBreed/CreateBreed";
import NotFound from "./components/NotFound/NotFound";
import Favorites from "./components/Favorites/Favorites";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

function App() {
  const auth = useSelector((state) => state.auth);
  const isAuth = auth._id;
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="home">
          <Route index element={<Home />} />
          <Route path=":id" element={<BreedDetails />} />
          <Route path="update/:id" element={<UpdateBreed />} />
        </Route>

        <Route
          path="create"
          element={isAuth ? <CreateBreed /> : <Navigate to="/login" />}
        />
        <Route
          path="/favorites"
          element={isAuth ? <Favorites /> : <Navigate to="/login" />}
        />

        <Route path="/not-found" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/not-found" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
