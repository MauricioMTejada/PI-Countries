import React, { useState } from "react";
import style from "./Paginado.module.css";
import CardsContainer from "../CardsContainer/CardsContainer";
import SelectorSortAlphabetical from "../SelectorSortAlphabetical/SelectorSortAlphabetical";
import SelectorSortPopulation from "../SelectorSortPopulation/SelectorSortPopulation";
import { SelectorContinent } from "../SelectorContinent/SelectorContinent";
import SelectorActivity from "../SelectorActivity/SelectorActivity";
import { useSelector } from "react-redux";

export default function Paginado() {

  // Trabajo con éste array que se encarga de traer a todos los países.
      const allPaises = useSelector((state) => state.paises);

  // Estado para re-renderizar el Orden Alfabético.
      // Sin éste estado, cuando presiono la lista desplegable no muestra
      // cambios hasta que se presiona el número de alguna página.
      // No funciona si se deja el estado en el componente hijo.
      // También se usa pra resetear el elemento mostrado en la lista desplegable,
      // cuando cambio las opciones de las listas Orden Alfabético y Por Población.
      const [orden, setOrden] = useState({
				sortAlpha: "sinOrden",
				sortPopul: "sinOrden",
				sortActivity: "Choose",
				sortContinent: "All",
			});


  // Número de página actual:
      const [currentPage, setCurrentPage] = useState(1);
  // Cantidad de elementos a renderizar:
      const presentarPaises = 10;
  // Último elemento:
      const indexOfLastCountry = currentPage * presentarPaises;
  // Primer elemento:
      const indexOfFirstCounty = indexOfLastCountry - presentarPaises;
  // Extraigo del array los elementos a renderizar
      const currentCountry = allPaises.slice(indexOfFirstCounty, indexOfLastCountry);
  // Función que setea el número de página a renderizar:
      const handlePaginado = (pageNumber) => { setCurrentPage(pageNumber); };
  // Control en consola:
      //console.log("imprimo los paises a renderizar (currentCountry)");
      //console.log(currentCountry);

  // Array de números de paginado a los que se le dará un vínculo:
      const pageNumbers = [];
      for (let i = 0; i < Math.ceil(allPaises.length / presentarPaises); i++) {
        pageNumbers.push(i + 1);}

  return (
        //<div className={style.container}>
        <div>
          {/* Selectores */}
            <div className={style.container}>
                <div className={style.selectores}>
                    <div className={style.selectoresLinea}>
                        <SelectorContinent orden={orden} setOrden={setOrden} setCurrentPage={setCurrentPage} />
                        <SelectorActivity orden={orden} setOrden={setOrden} setCurrentPage={setCurrentPage} />
                    </div>
                    <div className={style.selectoresLinea}>
                        <SelectorSortAlphabetical orden={orden} setOrden={setOrden} />
                        <SelectorSortPopulation orden={orden} setOrden={setOrden} />
                    </div>
                </div>
            </div>

          {/* Numeración paginado */}
              <nav>
                <ul>
                  {pageNumbers.length > 1 &&
                    pageNumbers.map((number) => (
                      <a className={style.numeroContainer} key={"a"+number} href={`#${number}a`}>
                        <span href={`#${number}`} key={number} className={style.numeroStyle} onClick={() => handlePaginado(number)} >
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
