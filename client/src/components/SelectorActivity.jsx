export default function SelectorActivity ({handleFilterActivities}) {
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