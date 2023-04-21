const { Activity } = require("../db");

const createActivity = async (nombre, dificultad, duracion, temporada) => {
  return await Activity.create({ nombre, dificultad, duracion, temporada });
};

const getAllActivities = async () => {
  return await Activity.findAll();
};

module.exports = { createActivity, getAllActivities };
