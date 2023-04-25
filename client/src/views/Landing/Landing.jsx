import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.imagenFondo}>
      <h1>PI Countries</h1>
      <Link to= "/home"> <button>Ingresar</button> </Link>
    </div>
  );
};

export default Landing;
