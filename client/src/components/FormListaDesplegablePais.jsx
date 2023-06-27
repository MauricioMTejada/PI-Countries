import { useSelector } from "react-redux";

export default function ListaDesplegablePais({changeHandler, form, errors}){
    const allPaises = useSelector((state) => state.backupPaises)

    function renderPaises() {
        return allPaises.map((pais) => (
        <option key={pais.id} value={pais.id}>
            {pais.nombre}
        </option>
        ));
    }

    return(
        <div>
            <div>
            <span>Pais 1: </span>
                <select onChange={changeHandler} value={form.pais1} name="pais1">
                    <option value="">- Seleccione un País -</option>
                    {renderPaises()}
                </select>{" "}
                <br />

            <span>Pais 2:_</span>
                <select onChange={changeHandler} value={form.pais2} name="pais2">
                    <option value="">- Seleccione un País -</option>
                    {renderPaises()}
                </select>{" "}
                <br />

            <span>Pais 3:_</span>
                <select onChange={changeHandler} value={form.pais3} name="pais3">
                    <option value="">- Seleccione un País -</option>
                    {renderPaises()}
                </select>
                </div>
                <br />

            {errors.pais && <span>{errors.pais}</span>}
        </div>
    )
}