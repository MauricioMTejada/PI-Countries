export default function SelectorSortPopulation ({handleSortPoblación}) {
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