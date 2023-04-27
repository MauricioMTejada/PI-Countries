const {
  createActivity,
  getAllActivities,
} = require("../controllers/activityController");

const getActivityHandler = async (req, res) => {
  try {
    const response = await getAllActivities();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createActivityHandler = async (req, res) => {
  const { nombre, dificultad, duracion, temporada, pais1, pais2, pais3 } = req.body;
  //console.log("En el Handler: ");
  //console.log(req.body);
  //res.status(200).json("Llegaron las datos.")

  try {
    const response = await createActivity(
      nombre,
      dificultad,
      duracion,
      temporada,
      pais1,
      pais2,
      pais3
    );
    res.status(200).json("Actividad Creada!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getActivityHandler, createActivityHandler };
