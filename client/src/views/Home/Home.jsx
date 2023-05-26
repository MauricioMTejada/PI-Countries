import CardsContainer from "../../components/CardsContainer/CardsContainer";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getByName,
  getPaises,
  filterContinent,
  orderByName,
  orderByPopulation,
} from "../../redux/actions";
import Paginado from "../../components/Paginado/Paginado";
import style from "./Home.module.css";
import { SelectorContinent } from "../../components/SelectorContinent";
import SelectorSortPopulation from "../../components/SelectorSortPopulation";
import SelectorSortAlphabetical from "../../components/SelectorSortAlphabetical";
import SelectorActivity from "../../components/SelectorActivity";

const Home = () => {
  // Redux
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getPaises()); }, [dispatch]);
    const paises = useSelector((state) => state.paises);


  //↓↓↓↓↓ Paginado ↓↓↓↓↓
  const [currentPage, setCurrentPage] = useState(1);
  const presentarPaises = 10;
  const indexOfLastCountry = currentPage * presentarPaises;
  const indexOfFirstCounty = indexOfLastCountry - presentarPaises;
  const currentCountry = paises.slice(indexOfFirstCounty, indexOfLastCountry);
  const paginado = (pageNumber) => { setCurrentPage(pageNumber); };
  //↑↑↑↑↑ Paginado ↑↑↑↑↑

  // NavBar
      // Cadena a Buscar:
        const [searchString, setSearchString] = useState("");

      // Detecta cambios a la entrada:
        function handleChange(event) {
          event.preventDefault();
          setSearchString(event.target.value);
          console.log(searchString);
        }

      // Submit:
        function handleSubmit(event) {
          event.preventDefault();
          if(searchString === "") {
            alert("Coloque el nombre de un país.");
            } else {
              dispatch(getByName(searchString));
              }

          setCurrentPage(1);
        }

  // Orden por Orden Alfabético:
    const [orden, setOrden] = useState("");
    function handleSortAlphabetical(element) {
      //console.log(element.target.value);
      element.preventDefault();
      dispatch(orderByName(element.target.value));
      setCurrentPage(1);
      setOrden(`${element.target.value}`);
      console.log(`Se realizó un orden: ${orden}`);
   }

  // Orden por Cantidad de Población:
    function handleSortPoblación(element) {
      element.preventDefault();
      dispatch(orderByPopulation(element.target.value));
      setCurrentPage(1);
      setOrden(`${element.target.value}`);
    }

  // Orden por Continente:
    function handleFilterContinent(event) {
      dispatch(filterContinent(event.target.value));
      setCurrentPage(1); }

  // Orden por Actividades
    function handleFilterActivities(event) {
      //dispatch(filterActividades(event.target.value));
      setCurrentPage(1);
    }

  return (
    <div className={style.imagenFondo}>

      <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />

      {/* Selectores */}
      <div className={style.selectores}>
          <SelectorSortAlphabetical handleSortAlphabetical={handleSortAlphabetical}/>
          <SelectorSortPopulation handleSortPoblación={handleSortPoblación}/>
          <SelectorContinent handleFilterContinent={handleFilterContinent}/>
          <SelectorActivity handleFilterActivities={handleFilterActivities} />
      </div>

      <Paginado presentarPaises={presentarPaises} paises={paises.length} paginado={paginado} />

      <CardsContainer currentCountry={currentCountry} />

    </div>
  );
};

export default Home;
