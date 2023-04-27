import { Link, useLocation } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = ({ handleChange, handleSubmit }) => {
  const location = useLocation();

  if (location.pathname === "/create") {
    return (
      <div className={style.mainContainer}>
        <Link to="/home">Home</Link>
        <Link to="/create">Form</Link>
        <div className={style.replaceSearch}></div>
      </div>
    );
  }

  return (
    <div className={style.mainContainer}>
      <Link to="/home">Home</Link>
      <Link to="/create">Form</Link>
      <form onChange={handleChange}>
        <input placeholder="Buscar" />
        <button type="submit" onClick={handleSubmit}>
          Buscar
        </button>
      </form>
    </div>
  );
};


export default NavBar;
