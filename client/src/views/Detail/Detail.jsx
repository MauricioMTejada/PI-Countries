import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import style from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const myCountry = useSelector((state) => state.detail);

  return (
    <div className={style.imagenFondo}>
      <div>
        <img
          src={myCountry.bandera}
          alt="Bandera"
          style={{ maxWidth: "250px", maxHeight: "170px" }}
        />
        <h1>{myCountry.nombre}</h1>

        <div>
          <strong>Id: </strong>
          <span>{myCountry.id}</span>
          <br />
          <strong>Continente: </strong>
          <span>{myCountry.continente}</span>
          <br />
          <strong>Subregión: </strong>
          <span>{myCountry.subregion}</span>
          <br />
          <strong>Capital: </strong>
          <span>{myCountry.capital}</span>
          <br />
          <strong>Área: </strong>
          <span>{myCountry.area}</span>
          <br />
          <strong>Población: </strong>
          <span>{myCountry.poblacion}</span>
          <br />
          <strong>Actividades: </strong>
          <span>{myCountry.actividades}</span>
        </div>
      </div>
      <br />
      <Link to="/home">
        {" "}
        <button>Volver</button>{" "}
      </Link>
    </div>
  );
}
