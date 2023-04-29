import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={style.card}>
      <Link to={`home/${props.id}`}>
        <img
          src={props.bandera}
          alt="Bandera"
          style={{ maxWidth: "250px", maxHeight: "170px" }}
        />
      </Link>

      <p>Nombre: {props.nombre}</p>
      <p>Continente: {props.continente}</p>
      <p>Población: {props.poblacion}</p>
    </div>
  );
};

export default Card;
