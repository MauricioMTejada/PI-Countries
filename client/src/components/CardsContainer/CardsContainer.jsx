import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = ({ paises }) => {
  return (
    <div className={style.container}>
      {paises.map((pais) => {
        return (
          <Card
            key={pais.id}
            id={pais.id}
            nombre={pais.nombre}
            bandera={pais.bandera}
            continente={pais.continente}
            capital={pais.capital}
            subregion={pais.subregion}
            area={pais.area}
            poblacion={pais.poblacion}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
