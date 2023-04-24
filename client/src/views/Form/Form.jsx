import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [form, setForm] = useState({
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    validate({ ...form, [property]: value });

    setForm({ ...form, [property]: value });
  };

  const validate = (form) => {
    if (/^[A-Z][a-z]*$/.test(form.nombre)) {
      setErrors({ ...errors, nombre: "" });
    } else {
      setErrors({ ...errors, nombre: "Nombre con mayúscula" });
    }
    if(form.nombre==="") setErrors({ ...errors, nombre: "Nombre vacío" });
   };

   const submitHandler = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3002/activity",form)
    .then(res=>alert(res))
    .catch(err=>alert(err))
   }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Nombre: </label>
        <input
          type="text"
          value={form.nombre}
          onChange={changeHandler}
          name="nombre"
        />
      </div>
      {errors.nombre && <span>{errors.nombre}</span>}
      <div>
        <label>Dificultad: </label>
        <input
          type="text"
          value={form.dificultad}
          onChange={changeHandler}
          name="dificultad"
        />
      </div>
      <div>
        <label>Duración: </label>
        <input
          type="text"
          value={form.duracion}
          onChange={changeHandler}
          name="duracion"
        />
      </div>
      <div>
        <label>Temporada: </label>
        <input
          type="text"
          value={form.temporada}
          onChange={changeHandler}
          name="temporada"
        />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default Form;
