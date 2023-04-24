import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = ({ handleChange, handleSubmit }) => {
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
