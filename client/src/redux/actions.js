import axios from "axios";

export const GET_PAISES = "GET_PAISES";
export const GET_BY_NAME = "GET_BY_NAME";

export const getPaises = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3002/countries");
    const paises = apiData.data;
    dispatch({ type: GET_PAISES, payload: paises });
  };
};

export const getByName = (name) => {
  return async function (dispatch) {
    console.log(`recibo el nombre que escribi en NavBar: ${name}`);
    const apiData = await axios.get(
      `http://localhost:3002/countries/?nombre=${name}`
    );
    const paisByName = [apiData.data];
    //console.log("llega al actions");
    //console.log(`datos que envía el seridor, paisByName: ${paisByName}`);
    //console.log(paisByName);
    dispatch({ type: GET_BY_NAME, payload: paisByName });
  };
};

/* export const getPais = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get("dirección_api" + "${id}");
    const pais = apiData.data;
    dispatch({ type: "GET_PAIS", payload: pais });
  };
}; */
