import axios from "axios";
import store from "./store"

const URLBASE = `http://localhost:3002/`;

export const GET_PAISES = "GET_PAISES";
export const GET_BY_NAME = "GET_BY_NAME";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const GET_LIST_ATIVITIES = "GET_LIST_ATIVITIES";
export const FILTER_BY_ACTIVITIES = "FILTER_BY_ACTIVITIES";

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
            //console.log(`id de country: ${id}`);
            let arrayIdActividades = [];
            let nombreActividadesSinDuplicados = [];

            try {
              let json = await axios.get(`${URLBASE}activity/`);
              let relaciones = json.data.relaciones;
              // console.log(relaciones);
              for (let i = 0; i < relaciones.length; i++) {
                if (relaciones[i].countryId === id) {
                  arrayIdActividades.push(relaciones[i].activityId);
                }
              }
              // console.log("Array actividades:");
              // console.log(arrayIdActividades);

              let actividades = json.data.actividades;
              // console.log(actividades)
              let nombreActividades = [];
              for (let i = 0; i < actividades.length; i++) {
                for (let j = 0; j < arrayIdActividades.length; j++) {
                  if (actividades[i].id === arrayIdActividades[j]){
                    // console.log(actividades[i]);
                    nombreActividades.push(actividades[i]);}
                }
              }

              // console.log(`nombreActividades: `);
              // console.log(nombreActividades);

              for (let i = nombreActividades.length - 1; i >= 0 ; i--) {

                let varAux = 0;
                for(let j = 0; j < nombreActividadesSinDuplicados.length; j++){
                  if (nombreActividades[i].nombre === nombreActividadesSinDuplicados[j].nombre){
                    varAux = 1;
                  }

                }

                if( varAux === 0) {
                  nombreActividadesSinDuplicados.push(nombreActividades[i])
                }

              }

              //nombreActividadesSinDuplicados = [...new Set(nombreActividades)];
              // console.log(`nombreActividadesSinDuplicados: `);
              // console.log(nombreActividadesSinDuplicados);
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

//Obtener actividades para la lista desplegable "Actividades"
    export function getListActivities(){
      return async function(dispatch) {
            // Para solicitar actividades:
            let nombreActividadesSinDuplicados = [];

            try {
              let json = await axios.get(`${URLBASE}activity/`);
              let actividades = json.data.actividades;
              // console.log(actividades)
              let nombreActividades = actividades.map((element) => {
                return element.nombre});
              // console.log(nombreActividades);
              nombreActividadesSinDuplicados = nombreActividades.filter((valor, indice, arreglo) => arreglo.indexOf(valor) === indice)
              // console.log(nombreActividadesSinDuplicados);

              return dispatch({
                type: GET_LIST_ATIVITIES,
                payload: nombreActividadesSinDuplicados
              })

            } catch (error) {
              console.log(error);
            }
      }
    }

//Filtrar Actividades
    export function filterActivities(nameActivitie) {
      // console.log(nameActivitie);
      return async function(dispatch) {
          try {
            //Solicito la tabla de actividades y la tabla de relaciones
                let json = await axios.get(`${URLBASE}activity/`);
                let actividades = json.data.actividades;
                // console.log(actividades);

                if(nameActivitie === "Choose"){
                  //Del arreglo de todos los países, filtro según los id obtenidos
                  let allPaises = store.getState().backupPaises;

                  return dispatch({
                    type: FILTER_BY_ACTIVITIES,
                    payload: allPaises });
                }

                let activitiesFilteredArrayId = [];
                if(nameActivitie === "All"){
                  //Filtro las actividades que coincidan con el elemento de la lista desplegable
                      let activitiesFiltered = actividades
                      activitiesFilteredArrayId = activitiesFiltered.map(element => element.id)
                      // console.log(activitiesFilteredArrayId)
                      } else {
                      //Filtro las actividades que coincidan con el elemento de la lista desplegable
                      let activitiesFiltered = actividades.filter(element => element.nombre === nameActivitie)
                      activitiesFilteredArrayId = activitiesFiltered.map(element => element.id)
                      // console.log(activitiesFilteredArrayId)
                      }

                //Busco los id de los países que coinciden con las actividades filtradas
                    let relaciones = json.data.relaciones;
                    // console.log(relaciones);
                    let idCountryWithNameActivitie = [];
                    activitiesFilteredArrayId.map(element =>
                      relaciones.map(anidado =>
                        element === anidado.activityId ? idCountryWithNameActivitie.push(anidado.countryId)  : null));
                    // console.log(idCountryWithNameActivitie);

                //Elimino duplicados de los id de países
                    let countryIdUnique = idCountryWithNameActivitie.filter(
                      (valor, indice, arreglo) => arreglo.indexOf(valor) === indice)
                    // console.log(countryIdUnique);

                //Del arreglo de todos los países, filtro según los id obtenidos
                    let allPaises = store.getState().backupPaises;
                    let countryActivityData = [];
                    countryIdUnique.map(element =>
                      allPaises.map(anidado =>
                        element === anidado.id ? countryActivityData.push(anidado) : null))
                    // let countryActivityData = allPaises.filter((element) => (element.id == nameActivitie))
                    // console.log(countryActivityData);

                return dispatch({
                  type: FILTER_BY_ACTIVITIES,
                  payload: countryActivityData });


          } catch (error) { console.log(error); }
      }
    }

export function filterActividades(value) {
    return;
}
