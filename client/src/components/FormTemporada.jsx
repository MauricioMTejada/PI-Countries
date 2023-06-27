export default function Temporada({changeHandler, form}){
    return (
        <div>
            <span>Temporada: </span>
            <select onChange={changeHandler} value={form.temporada} name="temporada" >
                <option value="Verano">Verano</option>
                <option value="Otoño">Otoño</option>
                <option value="Inverno">Inverno</option>
                <option value="Primavera">Primavera</option>
            </select>
        </div>
    )
}