import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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

  // Solicito información de todos los países al servidor.
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getPaises()); }, [dispatch]);





  return (
    <div className={style.imagenFondo}>

      <NavBar/>



      <Paginado />

    </div>
  );
};

export default Home;
