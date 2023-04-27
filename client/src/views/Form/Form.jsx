import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import style from "./Form.module.css"

const Form = () => {
  const [form, setForm] = useState({
    nombre: "",
    dificultad: 1,
    duracion: 1,
    temporada: "Verano",
    pais1: "",
    pais2: "",
    pais3: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    pais: "",
  });

  const [paises, setPaises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/countries")
      .then((res) => setPaises(res.data))
      .catch((err) => console.log(err));
  }, []);

  const changeHandler = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    validate({ ...form, [property]: value });
  };

  const validate = (form) => {
    if (/^[A-Z][a-z]*$/.test(form.nombre)) {
      setErrors({ ...errors, nombre: "" });
    } else {
      setErrors({ ...errors, nombre: "Nombre con mayúscula" });
    }
    if (form.nombre === "") setErrors({ ...errors, nombre: "Nombre vacío" });
  };

  const changeHandlerPais = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    validatePais({ ...form, [property]: value });
  };

  const validatePais = (form) => {
    if (form.pais2 === "" && form.pais3 === "");
    else {
      if (
        form.pais1 === form.pais2 ||
        form.pais1 === form.pais3 ||
        form.pais2 === form.pais3
      ) {
        setErrors({ ...errors, pais: "Los países deben ser distintos" });
        console.log(errors);
      } else {
        setErrors({ ...errors, pais: "" });
      }
    }

    console.log(`Del estado "errors" = ${errors.pais}`);
  };

  function renderPaises() {
    return paises.map((pais) => (
      <option key={pais.id} value={pais.id}>
        {pais.nombre}
      </option>
    ));
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (form.nombre === "") {
      alert("Debe completar un nombre. No se puede enviar");
      return;
    }
    if (errors.pais || errors.nombre)
      alert("Hay errores en el Formulario. No se puede enviar");
    else {
      axios
        .post("http://localhost:3002/activity", form)
        .then((res) => alert(res.data))
        .catch((err) => alert(err));
    }

    //console.log(form);
  };

  return (
    <div className={style.imagenFondo}>
      <NavBar />
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
          <span>Dificultad: </span>
          <select
            onChange={changeHandler}
            value={form.dificultad}
            name="dificultad"
          >
            <option value={1}>- 1 -</option>
            <option value={2}>- 2 -</option>
            <option value={3}>- 3 -</option>
            <option value={4}>- 4 -</option>
            <option value={5}>- 5 -</option>
          </select>
          <label>Dificultad: </label>
        </div>
        <div>
          <span>Duración: </span>
          <select
            onChange={changeHandler}
            value={form.duracion}
            name="duración"
          >
            <option value={1}>- 1 -</option>
            <option value={2}>- 2 -</option>
            <option value={3}>- 3 -</option>
            <option value={4}>- 4 -</option>
            <option value={5}>- 5 -</option>
            <option value={6}>- 6 -</option>
            <option value={7}>- 7 -</option>
            <option value={8}>- 8 -</option>
            <option value={9}>- 9 -</option>
            <option value={10}>- 10 -</option>
            <option value={11}>- 11 -</option>
            <option value={12}>- 12 -</option>
          </select>
        </div>
        <div>
          <span>Temporada: </span>
          <select
            onChange={changeHandler}
            value={form.temporada}
            name="temporada"
          >
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Inverno">Inverno</option>
            <option value="Primavera">Primavera</option>
          </select>
        </div>
        <div>
          {/* //↓↓↓↓↓ Selector de Pais ↓↓↓↓↓ */}
          <span>Pais 1: </span>
          <select onChange={changeHandlerPais} name="pais1">
            <option value="">- Seleccione un País -</option>
            {renderPaises()}
          </select>{" "}
          <br />
          <span>Pais 2:_</span>
          <select onChange={changeHandlerPais} name="pais2">
            <option value="">- Seleccione un País -</option>
            {renderPaises()}
          </select>{" "}
          <br />
          <span>Pais 3:_</span>
          <select onChange={changeHandlerPais} name="pais3">
            <option value="">- Seleccione un País -</option>
            {renderPaises()}
          </select>
          {/* //↑↑↑↑↑ Selector de Pais ↑↑↑↑↑ */}
        </div>
        <br />
        {errors.pais && <span>{errors.pais}</span>}

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
