import { Link, useLocation } from "react-router-dom";
import style from "./NavBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";

const NavBar = () => {
    const dispatch = useDispatch()
    const location = useLocation();

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
       //setCurrentPage(1);
     }


  return (
    <div className={style.mainContainer}>

      <Link to="/home">Home</Link>
      <Link to="/create">Form</Link>

      <div>
          {location.pathname === "/create" ? (
            <div style={{ width: '228px', height: '23px' }}/>) : (

            <form onChange={handleChange}>
              <input placeholder="Buscar" />
                <button type="submit" onClick={handleSubmit}>
                  Buscar
                </button>
            </form>
          )}
      </div>

    </div>
  );
};

export default NavBar;
