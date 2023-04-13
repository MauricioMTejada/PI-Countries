const { Router } = require('express');
const countriesRouter = require("./countriesRouter")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const routes = Router();

//routes.use("/countries", countriesRouter);

routes.use("/", routes.get("/", (req, res) => {
    res.status(200).send(`Todos los países`);
  }))

module.exports = routes;
