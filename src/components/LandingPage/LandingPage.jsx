import "./LandingPage.scss";
import perrolandingslice1 from "../../imgs/slices/perrolandingslice1.png";
import perrolandingslice2 from "../../imgs/slices/perrolandingslice2.png";
import perrolandingslice3 from "../../imgs/slices/perrolandingslice3.png";
import perrolandingslice4 from "../../imgs/slices/perrolandingslice4.png";
import perrolandingslice5 from "../../imgs/slices/perrolandingslice5.png";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const LandingPage = () => {
  const slides = [
    { url: perrolandingslice1, title: "perro1" },
    { url: perrolandingslice2, title: "perro2" },
    { url: perrolandingslice3, title: "perro3" },
    { url: perrolandingslice4, title: "perro4" },
    { url: perrolandingslice5, title: "perro5" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [slides]);
  return (
    <div
      className="slide-image"
      style={{ backgroundImage: `url(${slides[index].url})` }}
    >
      <div className="btnHome">
        <Link to="/home" className="Link">
          <h1>Home</h1>
        </Link>
      </div>

      <div className="dots-slice">
        {slides.map((slide, i) => (
          <span
            key={i}
            className={i === index ? "dotClicked" : "dot"}
            onClick={() => setIndex(i)}
          ></span>
        ))}
        {console.log(slides[index].url)}
      </div>
    </div>
  );
};

export default LandingPage;
