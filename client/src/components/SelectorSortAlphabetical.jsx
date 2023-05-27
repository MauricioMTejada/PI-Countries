import { useDispatch } from "react-redux";
import { orderByName } from "../redux/actions";

export default function SelectorSortAlphabetical ({ orden, setOrden }) {

    const dispatch = useDispatch();

    function handleSortAlphabetical(element) {
        console.log(element.target.value);

        dispatch(orderByName(element.target.value));
        setOrden(!orden);
    }

    return (
        <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            <span> <strong>Orden Alfabético:_</strong> </span>

            <select onChange={(element) => handleSortAlphabetical(element)}>
                <option value="sinOrden">Sin Alterar</option>
                <option value="ascendente">Ascendente</option>
                <option value="descendente">Descendente</option>
            </select>
        </div>
    )
}