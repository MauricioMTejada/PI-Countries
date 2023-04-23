import axios from "axios";

export const GET_PAISES = "GET_PAISES";

export const getPaises = () => {
  return async function (dispatch) {
    const apiData = await axios.get("dirección_api");
    const paises = apiData.data;
    dispatch({ type: GET_PAISES, payload: paises });
  };
};
