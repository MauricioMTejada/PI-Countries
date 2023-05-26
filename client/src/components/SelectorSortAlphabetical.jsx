export default function SelectorSortAlphabetical ({handleSortAlphabetical}) {
    return (
        <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            <span> <strong>Orden Alfabético:_</strong> </span>

            <select onChange={(element) => handleSortAlphabetical(element)}>
                <option value="sinOrden">Sin Alterar</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
        </div>
    )
}