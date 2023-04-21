const { Country } = require("../db");

// Para visualizar las tablas en SQL Shell, 
// ingresar el comando: SET client_encoding = 'UTF8';
// para no tener incompatibilidad con los datos y poder visualizarlos

const cargaDatosDB = async () => {
  let varBandera = await Country.findByPk("BRA");

  if (varBandera == null) {
    console.log("--- Cargando Base de Datos ---");

    let URL_BASE = "https://restcountries.com/v3/all";
    let id = "";
    let nombre = "";
    let bandera = "";
    let continente = "";
    let capital = "";
    let subregion = "";
    let area = 0;
    let poblacion = 0;

    fetch(`${URL_BASE}`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          id = data[i].cca3;
          nombre = data[i].name.common;
          bandera = data[i].flags[1];
          continente = data[i].continents[0];

          if (data[i].capital) capital = data[i].capital[0];
          else capital = "Sin Capital";

          if (data[i].subregion) subregion = data[i].subregion;
          else subregion = "Sin Subregion";

          area = Math.round(data[i].area);
          poblacion = data[i].population;

          const carga = async (
            id,
            nombre,
            bandera,
            continente,
            capital,
            subregion,
            area,
            poblacion
          ) => {
            await Country.create({
              id,
              nombre,
              bandera,
              continente,
              capital,
              subregion,
              area,
              poblacion,
            });
          };

          //console.log(`Antes de entrar a la tabla => nombre = ${nombre}`);

          carga(
            id,
            nombre,
            bandera,
            continente,
            capital,
            subregion,
            area,
            poblacion
          );
        }
      });

    console.log("--- Base de Batos Cargada ---");
  } else
    console.log("--- La Basa de Datos ya ha sido cargada anteriormente ---");
};

module.exports = cargaDatosDB;
