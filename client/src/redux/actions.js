import axios from "axios";

const URLBASE = `http://localhost:3002/`;

export const GET_PAISES = "GET_PAISES";
export const GET_BY_NAME = "GET_BY_NAME";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_DETAILS = "GET_DETAILS";

export const getPaises = () => {
  return async function (dispatch) {
    const apiData = await axios.get(URLBASE + "countries");
    const paises = apiData.data;
    dispatch({ type: GET_PAISES, payload: paises });
  };
};

export const getByName = (name) => {
  return async function (dispatch) {
    console.log(`recibo el nombre que escribi en NavBar: ${name}`);
    const apiData = await axios.get(
      `${URLBASE}countries/?nombre=${name}`
    );
    const paisByName = [apiData.data];
    //console.log("llega al actions");
    //console.log(`datos que envía el seridor, paisByName: ${paisByName}`);
    //console.log(paisByName);
    dispatch({ type: GET_BY_NAME, payload: paisByName });
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

export function getDetail(id) {
  console.log(`en el Actions, id: ${id}`);
  return async function (dispatch) {
    try {
      var json = await axios.get(`${URLBASE}countries/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data
      })
    } catch (error) {console.log(error);}
  };
}


