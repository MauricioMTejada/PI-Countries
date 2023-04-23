import { GET_PAISES } from "./actions";

const initialState = {
  paises: [
    {
      id: "ITA",
      nombre: "Italy",
      bandera: "https://flagcdn.com/w320/it.png",
      continente: "Europe",
      capital: "Rome",
      subregion: "Southern Europe",
      area: 301336,
      poblacion: 59554023,
    },
    {
      id: "BGD",
      nombre: "Bangladesh",
      bandera: "https://flagcdn.com/w320/bd.png",
      continente: "Asia",
      capital: "Dhaka",
      subregion: "Southern Asia",
      area: 147570,
      poblacion: 164689383,
    },
    {
      id: "DNK",
      nombre: "Denmark",
      bandera: "https://flagcdn.com/w320/dk.png",
      continente: "Europe",
      capital: "Copenhagen",
      subregion: "Northern Europe",
      area: 43094,
      poblacion: 5831404,
    },
    {
      id: "QAT",
      nombre: "Qatar",
      bandera: "https://flagcdn.com/w320/qa.png",
      continente: "Asia",
      capital: "Doha",
      subregion: "Western Asia",
      area: 11586,
      poblacion: 2881060,
    },
    {
      id: "PAN",
      nombre: "Panama",
      bandera: "https://flagcdn.com/w320/pa.png",
      continente: "North America",
      capital: "Panama City",
      subregion: "Central America",
      area: 75417,
      poblacion: 4314768,
    },
    {
      id: "MYT",
      nombre: "Mayotte",
      bandera: "https://flagcdn.com/w320/yt.png",
      continente: "Africa",
      capital: "Mamoudzou",
      subregion: "Eastern Africa",
      area: 374,
      poblacion: 226915,
    },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAISES:
      return {...state, paises: action.payload}; 

    default:
      return { ...state };
  }
};

export default rootReducer;