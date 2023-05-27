import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPaises, } from "../../redux/actions";
import NavBar from "../../components/NavBar/NavBar";
import Paginado from "../../components/Paginado/Paginado";
import style from "./Home.module.css";

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
