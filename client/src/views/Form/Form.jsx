import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPaises } from "../../redux/actions";
import axios from "axios";
import style from "./Form.module.css";
import NavBar from "../../components/NavBar/NavBar";
import InputNombre from "../../components/FormInputNombre";
import Dificultad from "../../components/FormDificultad";
import Duracion from "../../components/FormDuracion";
import Temporada from "../../components/FormTemporada";
import ListaDesplegablePais from "../../components/FormListaDesplegablePais";

const Form = () => {
  // Estados
      const [form, setForm] = useState({
				nombre: "",
				dificultad: 1,
				duracion: 1,
				temporada: "Verano",
				pais1: "",
				pais2: "",
				pais3: "", });
      const [errors, setErrors] = useState({
				nombre: "",
				dificultad: "",
				duracion: "",
				temporada: "",
				pais: "", });

  // Solicito información de todos los países al servidor.
      const dispatch = useDispatch();
      useEffect(() => { dispatch(getPaises()); }, [dispatch]);

  // Handler
      const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value });
        validate({ ...form, [property]: value }); };

  // Validación
      const validate = (form) => {
        if (/^[A-ZÑ][a-zñ]*$/.test(form.nombre)) { setErrors({ ...errors, nombre: "" });
            } else { setErrors({ ...errors, nombre: "Nombre con mayúscula" }); }
        if (form.nombre === "") setErrors({ ...errors, nombre: "Nombre vacío" });
        if (form.pais2 === "" && form.pais3 === "");
            else {
              if ( form.pais1 === form.pais2 || form.pais1 === form.pais3 || form.pais2 === form.pais3 ) {
                  setErrors({ ...errors, pais: "Los países deben ser distintos" });
                  console.log(errors);
              } else { setErrors({ ...errors, pais: "" }); } } };

  // Submit
      const submitHandler = (event) => {
        event.preventDefault();
        console.log(form);
        if (form.nombre === "") {
            alert("Debe completar un nombre. No se puede enviar");
            return; }
        if (errors.pais || errors.nombre)
            alert("Hay errores en el Formulario. No se puede enviar");
        else { axios
            .post("http://localhost:3002/activity", form)
              .then((res) => {
                alert(res.data);
                setForm({
									...form,
									nombre: "",
									dificultad: 1,
									duracion: 1,
									temporada: "Verano",
									pais1: "",
									pais2: "",
									pais3: "", }); })
              .catch((err) => alert(err)); } };

  return (
    <div className={style.imagenFondo}>
      <NavBar />
      <div className={style.formulario}>
          <form onSubmit={submitHandler}>
            <InputNombre changeHandler={changeHandler} form={form} errors={errors}/>
            <Dificultad changeHandler={changeHandler} form={form} />
            <Duracion changeHandler={changeHandler} form={form} />
            <Temporada changeHandler={changeHandler} form={form} />
            <ListaDesplegablePais changeHandler={changeHandler}  form={form} errors={errors} />
            <button type="submit">Enviar</button>
          </form>
      </div>
    </div>
  );
};

export default Form;
