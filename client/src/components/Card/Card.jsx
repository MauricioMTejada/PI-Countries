import style from "./Card.module.css"

const Card = (props) => {
  return (
    <div className={style.card}>
      <p>Id: {props.id}</p>
      <p>Nombre: {props.nombre}</p>
      <p>Bandera: {props.bandera}</p>
      <p>Continente: {props.continente}</p>
      <p>Capital: {props.capital}</p>
      <p>Subregion: {props.subregion}</p>
      <p>Area: {props.area}</p>
      <p>Población: {props.poblacion}</p>
    </div>
  );
}; 

export default Card;