const {createActivityDB} = require("../controllers/activityController")

const getActivityHandler = (req, res) => {
  res.status(200).send(`Todos las actividades`);
};

const createActivityHandler = async (req, res) => {
  const { nombre, dificultad, duracion, temporada } = req.body;
  console.log(nombre, dificultad, duracion, temporada);

  try {
    const response = await createActivityDB(nombre, dificultad, duracion, temporada);
    res.status(200).json(response);
    
  } catch (error) { 
    res.status(400).json({error: error.message});
    
  }

  //res.status(200).send(`Actividad ${nombre} creada con éxito!!!`);
};

module.exports = { getActivityHandler, createActivityHandler };
