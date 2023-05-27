import axios from "axios";
import store from "./store"

const URLBASE = `http://localhost:3002/`;

export const GET_PAISES = "GET_PAISES";
export const GET_BY_NAME = "GET_BY_NAME";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";

// Buscar la lista completa de países:
  export const getPaises = () => {
    return async function (dispatch) {
      const apiData = await axios.get(URLBASE + "countries");
      const paises = apiData.data;
      dispatch({ type: GET_PAISES, payload: paises });
    };
  };

export const getByName = (nombre) => {
  console.log(`(1)recibo el nombre que escribí en NavBar: ${nombre}`);
  console.log(nombre);

    const name = nombre
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return async function (dispatch) {
      //console.log(`(2)recibo el nombre que escribí en NavBar: ${name}`);
      const apiData = await axios.get(`${URLBASE}countries/?nombre=${name}`);
      const paisByName = [apiData.data];
      console.log("llega al actions");
      console.log(`datos que envía el servidor, paisByName: ${apiData}`);
      console.log(apiData);
      //console.log(paisByName);
      if (apiData.data === null) {
        alert("País no encontrado");
        return;
      } else dispatch({ type: GET_BY_NAME, payload: paisByName });
    };

};

export function filterContinent(payload) {
  //console.log(payload);
  return { type: FILTER_BY_CONTINENT, payload: payload };
}

// Ordenar por Nombre:
    export function orderByName(orden) {
      let allPaises = store.getState().paises;
      console.log("Tipo de orden:");
      console.log(orden);

      if (orden === "ascendente") {
        allPaises.sort(function (a, b) {
          if (a.nombre > b.nombre) { return 1; }
          if (a.nombre < b.nombre) { return -1; }
          return 0; }); }

      if (orden === "descendente") {
        allPaises.sort(function (a, b) {
          if (a.nombre < b.nombre) { return 1; }
          if (a.nombre > b.nombre) { return -1; }
          return 0; }); }

      if (orden === "sinOrden") {
        allPaises = store.getState().copiaPaises;

      }

      console.log("En el action: ");
      console.log(allPaises);


      return {
        type: ORDER_BY_NAME,
        payload: allPaises,
      };
    }

export function orderByPopulation(payload) {
  // console.log(payload);
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
}

export function getDetail(id) {
  //console.log(`en el Actions, id: ${id}`);
  return async function (dispatch) {
    //let arrayDetail = [];
    let arrayIdActividades = [];
    let nombreActividadesSinDuplicados = [];

    try {
      let json = await axios.get(`${URLBASE}activity/`);
      //console.log(json.data);
      //console.log(json.data.actividades);
      //console.log(json.data.relaciones);
      let relaciones = json.data.relaciones;
      //console.log(relaciones);
      for (let i = 0; i < relaciones.length; i++) {
        if (relaciones[i].countryId === id) {
          arrayIdActividades.push(relaciones[i].activityId);
          //console.log(relaciones[i].countryId);
          //console.log(relaciones[i].activityId);
        }

        /* if (relaciones[i].countryId === id) {
          arrayDetail[1] = [...arrayDetail[1], relaciones[i].activityId];
          //console.log();
        } */
      }
      //console.log(arrayIdActividades);
      //console.log(arrayDetail);
      let actividades = json.data.actividades;
      let nombreActividades = [];
      //console.log(actividades);
      for (let i = 0; i < actividades.length; i++) {
        for (let j = 0; j < arrayIdActividades.length; j++) {
          if (actividades[i].id === arrayIdActividades[j])
            nombreActividades.push(actividades[i].nombre);
        }
      }

      //console.log(nombreActividades);
      nombreActividadesSinDuplicados = [...new Set(nombreActividades)];
      console.log(nombreActividadesSinDuplicados);
    } catch (error) {
      console.log(error);
    }

    try {
      let json = await axios.get(`${URLBASE}countries/${id}`);
      json.data.actividades = nombreActividadesSinDuplicados;
      console.log(json.data);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function filterActividades(value) {
    return;
 /*  return async function (value){

  } */

}

/* export function countryInActivity(payload) */
