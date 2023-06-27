import { useDispatch } from "react-redux";
import { filterContinent } from "../../redux/actions";
import style from "./SelectorContinent.module.css"

export function SelectorContinent ({ orden, setOrden, setCurrentPage }) {
const dispatch = useDispatch();

    // Orden por Continente:
    function handleFilterContinent(event) {
      dispatch(filterContinent(event.target.value));
      setOrden({...orden, sortPopul: "sinOrden", sortAlpha: "sinOrden", sortActivity:"Choose", sortContinent:event.target.value });
      setCurrentPage(1);
    }

    return (
        <div  className={style.container}>
            <span  className={style.leftElement}> <strong>Filtrar por Continente: </strong> </span>

            <span className={style.rightElement}>
              <select value={orden.sortContinent} onChange={(event) => handleFilterContinent(event)}>
                <option value="All">Todos los Países</option>
                <option value="Africa">África</option>
                <option value="Europe">Europa</option>
                <option value="Asia">Asia</option>
                <option value="North America">América del Norte</option>
                <option value="Oceania">Oceanía</option>
                <option value="South America">América del Sur</option>
                <option value="Antarctica">Antártica</option>
              </select>
            </span>
        </div>

    )
}