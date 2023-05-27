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

// Buscador de países:
    export const getByName = (nombre) => {
        // Adapto: primera letra mayúscula, siguientes minúsculas.
        const name = nombre
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");

        return async function (dispatch) {
          const apiData = await axios.get(`${URLBASE}countries/?nombre=${name}`);
          const paisByName = [apiData.data];
          if (apiData.data === null) {
            alert("País no encontrado");
            return;
          } else dispatch({ type: GET_BY_NAME, payload: paisByName });
        };

    };

// Filtrar por Continente:
    export function filterContinent(orden) {
      let allPaises = store.getState().backupPaises;
      const statusFiltered =
        orden === "All"
          ? allPaises
          : allPaises.filter((element) => element.continente === orden);

      return {
        type: FILTER_BY_CONTINENT,
        payload: statusFiltered };
    }

// Ordenar por Orden Alfabético:
    export function orderByName(orden) {
      let allPaises = store.getState().paises;

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

      // if (orden === "sinOrden") {
      //   allPaises = store.getState().backupPaises; }

      return {
        type: ORDER_BY_NAME,
        payload: allPaises, };
    }

// Ordenar por cantidad de Población:
    export function orderByPopulation(orden) {
      let allPaises = store.getState().paises;

        if (orden === "asc") {
          allPaises.sort(function (a, b) {
            if (a.poblacion > b.poblacion) { return 1; }
            if (a.poblacion < b.poblacion) { return -1; }
            return 0; }); }

        if (orden === "desc") {
          allPaises.sort(function (a, b) {
            if (a.poblacion < b.poblacion) { return 1; }
            if (a.poblacion > b.poblacion) { return -1; }
            return 0; }); }

        if (orden === "sinOrden") {
          allPaises = store.getState().backupPaises; }

        return {
          type: ORDER_BY_POPULATION,
          payload: allPaises, };
    }

// Vista Detalle:
    export function getDetail(id) {
      return async function (dispatch) {

        // Para solicitar actividades:
            let arrayIdActividades = [];
            let nombreActividadesSinDuplicados = [];

            try {
              let json = await axios.get(`${URLBASE}activity/`);
              let relaciones = json.data.relaciones;
              for (let i = 0; i < relaciones.length; i++) {
                if (relaciones[i].countryId === id) {
                  arrayIdActividades.push(relaciones[i].activityId);
                }
              }
              let actividades = json.data.actividades;
              let nombreActividades = [];
              for (let i = 0; i < actividades.length; i++) {
                for (let j = 0; j < arrayIdActividades.length; j++) {
                  if (actividades[i].id === arrayIdActividades[j])
                    nombreActividades.push(actividades[i].nombre);
                }
              }

              nombreActividadesSinDuplicados = [...new Set(nombreActividades)];
            } catch (error) {
              console.log(error);
            }


        // Para solicitar los detalles del Pais al servidor:
            try {
                let json = await axios.get(`${URLBASE}countries/${id}`);
                // Al dato que llega le agrego las actividades:
                    json.data.actividades = nombreActividadesSinDuplicados;

                return dispatch({
                    type: GET_DETAILS,
                    payload: json.data, });
            } catch (error) {
                console.log(error); }
      };
    }

export function filterActividades(value) {
    return;
}
