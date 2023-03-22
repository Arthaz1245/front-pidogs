import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LandingPage from "./components/LandingPage/LandingPage";
import BreedDetails from "./components/BreedDetails/BreedDetails";
import UpdateBreed from "./components/UpdateBreed/UpdateBreed";
import CreateBreed from "./components/CreateBreed/CreateBreed";
import Home from "./components/Home/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="home">
          <Route index element={<Home />} />
          <Route path=":id" element={<BreedDetails />} />
          <Route path="update/:id" element={<UpdateBreed />} />
          <Route path="create" element={<CreateBreed />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
