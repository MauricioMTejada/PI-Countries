import axios from "axios";

export const GET_PAISES = "GET_PAISES";

export const getPaises = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3002/countries");
    const paises = apiData.data;
    dispatch({ type: GET_PAISES, payload: paises });
  };
};

/* export const getPais = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get("dirección_api" + "${id}");
    const pais = apiData.data;
    dispatch({ type: "GET_PAIS", payload: pais });
  };
}; */
