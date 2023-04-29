const { Activity, ActivityCountry } = require("../db");

/* const createActivity = async (nombre, dificultad, duracion, temporada) => {
  return await Activity.create({ nombre, dificultad, duracion, temporada });
}; */

const createActivity = async (
  nombre,
  dificultad,
  duracion,
  temporada,
  pais1,
  pais2,
  pais3
) => {
  console.log("Dentro del controler: ");
  console.log(nombre, dificultad, duracion, temporada, pais1, pais2, pais3);
  const activity = await Activity.create({
    nombre,
    dificultad,
    duracion,
    temporada,
  });
  if(pais1) await ActivityCountry.create({activityId: activity.id, countryId: pais1});
  if(pais2) await ActivityCountry.create({activityId: activity.id, countryId: pais2});
  if(pais3) await ActivityCountry.create({activityId: activity.id, countryId: pais3});
  //console.log("Pasando el controler");
  //console.log(nombre, dificultad, duracion, temporada, pais1, pais2, pais3);
  return;
};

const getAllActivities = async () => {
  const activityAndRelations = { actividades: [], relaciones: []}
  activityAndRelations.actividades = await Activity.findAll();
  activityAndRelations.relaciones = await ActivityCountry.findAll();
  return activityAndRelations;
};

module.exports = { createActivity, getAllActivities };
