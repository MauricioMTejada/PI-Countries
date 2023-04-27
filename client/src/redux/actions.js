import axios from "axios";

const URLBASE = `http://localhost:3002/`;

export const GET_PAISES = "GET_PAISES";
export const GET_BY_NAME = "GET_BY_NAME";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";

export const getPaises = () => {
  return async function (dispatch) {
    const apiData = await axios.get(URLBASE + "countries");
    const paises = apiData.data;
    dispatch({ type: GET_PAISES, payload: paises });
  };
};

export const getByName = (nombre) => {
  //console.log(`(1)recibo el nombre que escribi en NavBar: ${nombre}`);
  const name = nombre
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return async function (dispatch) {
    //console.log(`(2)recibo el nombre que escribi en NavBar: ${name}`);
    const apiData = await axios.get(`${URLBASE}countries/?nombre=${name}`);
    const paisByName = [apiData.data];
    console.log("llega al actions");
    console.log(`datos que envía el seridor, paisByName: ${apiData}`);
    console.log(apiData);
    //console.log(paisByName);
    if (apiData.data === null) {
      alert("País no encontrado");
      return;
    }else(dispatch({ type: GET_BY_NAME, payload: paisByName }))
    
  };
};

export function filterContinent(payload) {
  //console.log(payload);
  return { type: FILTER_BY_CONTINENT, payload: payload };
}

export function orderByName(payload) {
  // console.log(payload);
  return {
    type: ORDER_BY_NAME,
    payload,
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
    try {
      var json = await axios.get(`${URLBASE}countries/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/* export function contryInActivity(payload) */
