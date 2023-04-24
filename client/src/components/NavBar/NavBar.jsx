import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <Link to="/home">Home</Link>
      <Link to="/create">Form</Link>
      <form>
        <input placeholder="Buscar"/>
        <button>Buscar</button>
      </form>
    </div>
  );
};

export default NavBar;
