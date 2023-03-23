import "./CardsBreeds.scss";
import Card from "../Card/Card";

const CardsBreeds = ({ breeds }) => {
  return (
    <div className="dog-breeds">
      {breeds.map((breed) => (
        <Card
          key={breed.id}
          id={breed.createdInDB ? breed._id : breed.id}
          image={breed.image}
          name={breed.name}
          min_height={breed.min_height}
          max_height={breed.max_height}
          min_weight={breed.min_weight}
          max_weight={breed.max_weight}
          min_lifespan={breed.min_lifespan}
          max_lifespan={breed.max_lifespan}
          temperaments={breed.temperaments}
        />
      ))}
    </div>
  );
};

export default CardsBreeds;
