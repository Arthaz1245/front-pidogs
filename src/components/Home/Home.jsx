import CardsBreeds from "../CardsBreeds/CardsBreeds";
import Pagination from "../Pagination/Pagination";
import "./Home.scss";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dogsFetch } from "../../features/breedsSlice";
const Home = () => {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.breeds.breeds);
  const breedsStatus = useSelector((state) => state.breeds.status);
  const error = useSelector((state) => state.breeds.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const [order, setOrder] = useState("");
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = breeds.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    if (breedsStatus === "idle") {
      dispatch(dogsFetch());
    }
  }, [breedsStatus, dispatch]);
  if (breedsStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (breedsStatus === "failed") {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div className="breedCards">
        <CardsBreeds breeds={currentPosts} />
        <Pagination
          totalPosts={breeds.length}
          postPerPage={postPerPage}
          setPostPerpage={setPostPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        <SearchBar setCurrentPage={setCurrentPage} />
        <Filters
          setCurrentPage={setCurrentPage}
          setOrder={setOrder}
          order={order}
        />
      </div>
    </div>
  );
};

export default Home;
