import { useDispatch } from "react-redux";
import { orderByPopulation } from "../redux/actions";

export default function SelectorSortPopulation ({handleSortPoblación}) {
    const dispatch = useDispatch

      // Orden por Cantidad de Población:
      function handleSortPoblación(element) {
        element.preventDefault();
        dispatch(orderByPopulation(element.target.value));
        //setCurrentPage(1);
        //setOrden(`${element.target.value}`);
      }
    return (
        <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            <span> <strong> Orden por Población: </strong> </span>

            <select onChange={(element) => handleSortPoblación(element)}>
                <option value="sinOrden">Sin Alterar</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
        </div>
    );
}