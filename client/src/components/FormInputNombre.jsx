
export default function InputNombre({changeHandler, form, errors}){

    return (
        <>
            <div>
                <label>Nombre: </label>
                <input type="text" value={form.nombre} onChange={changeHandler} name="nombre" />
            </div>

            {errors.nombre && <span>{errors.nombre}</span>}
        </>

    )
}