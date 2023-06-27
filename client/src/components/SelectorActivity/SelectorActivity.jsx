import { useDispatch, useSelector } from "react-redux"
import { filterActivities, getListActivities } from "../../redux/actions";
import { useEffect } from "react";
import style from "./SelectorActivity.module.css"

export default function SelectorActivity ({ orden, setOrden, setCurrentPage }) {
const dispatch = useDispatch();

useEffect(()=> {
  dispatch(getListActivities());
}, [dispatch])

const listaActividades = useSelector((state) => state.listaActividades)
// console.log(listaActividades);

  // Orden por Actividades
  function handleFilterActivities(event) {
    // console.log(event.target.value);
    dispatch(filterActivities(event.target.value));
    setOrden({...orden, sortPopul: "sinOrden", sortAlpha: "sinOrden", sortContinent:"All", sortActivity: event.target.value });
    setCurrentPage(1);
  }

    return (
        <div className={style.container}>
            <span> <strong>Filtrar por Actividad: </strong> </span>

            <select value={orden.sortActivity} onChange={(event) => handleFilterActivities(event)}>
                <option value="Choose">- Elija una Actividad -</option>
                {listaActividades.map((element) => {
                  return (<option key={element} value={element}>{element}</option>)
                })}
                <option value="All">Todas las Actividades</option>
            </select>
        </div>
    )
}