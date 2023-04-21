const { Router } = require("express");
const {
  getCountriesHandler,
  getDetailCountriesHandler,
} = require("../handlers/countriesHandler");

const countriesRouter = Router();

countriesRouter.get("/", getCountriesHandler);

countriesRouter.get("/:id", getDetailCountriesHandler);

module.exports = countriesRouter;
