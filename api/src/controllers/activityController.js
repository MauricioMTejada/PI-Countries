const {Activity} = require("../db");

const createActivityDB = async (nombre, dificultad, duracion, temporada) => {
    return await Activity.create({nombre, dificultad, duracion, temporada});
};

module.exports = {createActivityDB};