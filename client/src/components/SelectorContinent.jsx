export function SelectorContinent ({ handleFilterContinent }) {
    return (
        <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            <span> <strong>Orden por Continente:_</strong> </span>

            <select onChange={(event) => handleFilterContinent(event)}>
              <option value="All">Todos los Países</option>
              <option value="Africa">África</option>
              <option value="Europe">Europa</option>
              <option value="Asia">Asia</option>
              <option value="North America">América del Norte</option>
              <option value="Oceania">Oceanía</option>
              <option value="South America">América del Sur</option>
              <option value="Antarctica">Antártica</option>
            </select>
        </div>

    )
}