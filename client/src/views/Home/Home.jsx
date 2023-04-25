import CardsContainer from "../../components/CardsContainer/CardsContainer";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getByName,
  getPaises,
  filterContinent,
  orderByName,
} from "../../redux/actions";
import Paginado from "../../components/Paginado/Paginado";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const paises = useSelector((state) => state.paises);
  //console.log(paises);
  // Estado auxiliar para refrescar la página
  //const [auxiliar,setAuxiliar] = useState(0)

  //↓↓↓↓↓ Paginado ↓↓↓↓↓
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  ////const [presentarPaises, setPresentarPaises] = useState(10);
  const presentarPaises = 10;
  const indexOfLastCountry = currentPage * presentarPaises;
  const indexOfFirstCounty = indexOfLastCountry - presentarPaises;
  const currentCountry = paises.slice(indexOfFirstCounty, indexOfLastCountry);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //↑↑↑↑↑ Paginado ↑↑↑↑↑

  function handleChange(event) {
    event.preventDefault();
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getByName(searchString));
  }

  useEffect(() => {
    dispatch(getPaises());
  }, [dispatch]);

  const [orden, setOrden] = useState("");
  function handleSort(element) {
    //console.log(element.target.value);
    element.preventDefault();
    dispatch(orderByName(element.target.value));
    setCurrentPage(1);
    setOrden(`${element.target.value}`);
    console.log(`Se realizó un orden: ${orden}`);
  }

  function handleFilterContient(event) {
    //console.log(event.target.value);
    dispatch(filterContinent(event.target.value));
    setCurrentPage(1);
  }

  return (
    <div className={style.imagenFondo}>
      <h1>Esta es la vista de Home</h1>
      <NavBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        paginado={paginado}
      />
      <div className={style.selectores}>
        {/* //↓↓↓↓↓ Selector Orden ↓↓↓↓↓ */}
        <select onChange={(element) => handleSort(element)}>
          <option value="sinOrden">Sin Alterar</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        {/* //↑↑↑↑↑ Selector Orden ↑↑↑↑↑ */}

        <div className={style.espacioSelectores}></div>

        {/* //↓↓↓↓↓ Selector Continente ↓↓↓↓↓ */}
        <select onChange={(event) => handleFilterContient(event)}>
          <option value="All">Todos los Países</option>
          <option value="Africa">África</option>
          <option value="Europe">Europa</option>
          <option value="Asia">Asia</option>
          <option value="North America">América del Norte</option>
          <option value="Oceania">Oceanía</option>
          <option value="South America">América del Sur</option>
          <option value="Antarctica">Antártica</option>
        </select>
        {/* //↑↑↑↑↑ Selector Continente ↑↑↑↑↑ */}
      </div>
      <Paginado
        presentarPaises={presentarPaises}
        paises={paises.length}
        paginado={paginado}
      />
      <CardsContainer currentCountry={currentCountry} />
    </div>
  );
};

export default Home;
