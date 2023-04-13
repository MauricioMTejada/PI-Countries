const getCountriesHandler = (req, res) => {
  res.status(200).send(`Todos los países`);
};

module.exports = getCountriesHandler;