import React, { useState } from "react";
import style from "./Paginado.module.css";
import CardsContainer from "../CardsContainer/CardsContainer";
import SelectorSortAlphabetical from "../SelectorSortAlphabetical";
import SelectorSortPopulation from "../SelectorSortPopulation";
import { SelectorContinent } from "../SelectorContinent";
import SelectorActivity from "../SelectorActivity";
import { useSelector } from "react-redux";

export default function Paginado() {

  // Trabajo con éste array que se encarga de traer a todos los países.
      const allPaises = useSelector((state) => state.paises);

  // Estado para re-renderizar el Orden Alfabético.
      // Sin éste estado, cuando presiono la lista desplegable no muestra
      // cambios hasta que se presiona el número de alguna página.
      // No funciona si se deja el estado en el componente hijo.
      const [orden, setOrden] = useState(false);


  // Número de página actual:
      const [currentPage, setCurrentPage] = useState(1);
  // Cantidad de elementos a renderizar:
      const presentarPaises = 10;
  // Último elemento:
      const indexOfLastCountry = currentPage * presentarPaises;
  // Primer elemento:
      const indexOfFirstCounty = indexOfLastCountry - presentarPaises;
  // Elementos a renderizar
      const currentCountry = allPaises.slice(indexOfFirstCounty, indexOfLastCountry);
  // Función que setea el número de página:
      const handlePaginado = (pageNumber) => { setCurrentPage(pageNumber); };
  // Control en consola:
      console.log("imprimo los paises a renderizar (currentCountry)");
      console.log(currentCountry);

  // Arreglo de números a los que se le dará un vínculo:
      const pageNumbers = [];
      for (let i = 0; i < Math.ceil(allPaises.length / presentarPaises); i++) {
        pageNumbers.push(i + 1);}

  return (
      <div>
          {/* Selectores */}
              <div className={style.selectores}>
              <SelectorSortAlphabetical orden={orden} setOrden={setOrden} />
              <SelectorSortPopulation />
              <SelectorContinent />
              <SelectorActivity />
              </div>

          {/* Numeración paginado */}
              <nav>
                <ul>
                  {pageNumbers.length > 1 &&
                    pageNumbers.map((number) => (
                      <a className={style.numeroContainer} key={"a"+number} href={`#${number}a`}>
                        <span
                          href={`#${number}`}
                          key={number}
                          className={style.numeroStyle}
                          onClick={() => handlePaginado(number)}
                          >
                          {number}
                        </span>
                      </a>
                    ))}
                </ul>
              </nav>

          {/* Elementos a visualizar */}
              <CardsContainer currentCountry={currentCountry}/>

      </div>
  );
}
