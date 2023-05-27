//import { useDispatch } from "react-redux"

export default function SelectorActivity ({handleFilterActivities}) {
//const dispatch = useDispatch();

  // Orden por Actividades
  function handleFilterActivities(event) {
    //dispatch(filterActividades(event.target.value));
    //setCurrentPage(1);
  }

    return (
        <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            <span> <strong>Orden por Actividad:_</strong> </span>

            <select onChange={(event) => handleFilterActivities(event)}>
                <option value="All">Todos las Actividades</option>
                <option value="texto"></option>
            </select>
        </div>
    )
}