import { useDispatch } from "react-redux";
import { orderByPopulation } from "../redux/actions";

export default function SelectorSortPopulation ({ orden, setOrden }) {
    const dispatch = useDispatch();

    function handleSortPoblación(element) {
        //console.log(element.target.value);
        dispatch(orderByPopulation(element.target.value));
        setOrden({...orden, sortAlpha: "sinOrden", sortPopul: element.target.value});
      }

    return (
        <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            <span> <strong> Orden por Población: </strong> </span>

            <select value={orden.sortPopul} onChange={(element) => handleSortPoblación(element)}>
                <option value="sinOrden">- Elija un orden -</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
        </div>
    );
}