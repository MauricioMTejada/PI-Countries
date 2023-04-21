const {
  getAllCountries,
  getCoutryByName,
  getDetailCountry,
} = require("../controllers/countryController");

const getCountriesHandler = async (req, res) => {
  const { nombre } = req.query;

  try {
    if (nombre) {
      const coutryByName = await getCoutryByName(nombre);
      res.status(200).json(coutryByName);
    } else {
      const response = await getAllCountries();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDetailCountriesHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getDetailCountry(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCountriesHandler, getDetailCountriesHandler };
