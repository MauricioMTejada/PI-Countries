const { Router } = require("express");
const countriesRouter = require("./countriesRouter");
const activityRouter = require ("./activitysRouter")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const routes = Router();

//routes.use("/countries", countriesRouter);

routes.get("/", (req, res) => {
  res.status(200).send(`Página Principal (Prueba)`);
});


routes.use("/countries", countriesRouter);

routes.use("/activity", activityRouter);

module.exports = routes;
