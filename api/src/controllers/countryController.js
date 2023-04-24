const { Country, Activity } = require("../db");

const getAllCountries = async () => {
  return await Country.findAll();
};

const getCoutryByName = async (name) => {
  //console.log(`estoy en el controler, name= ${name}`);
  return await Country.findOne({ where: { nombre: name } });
};

const getDetailCountry = async (id) => {
  return await Country.findByPk(id, {
    include: [
      {
        model: Activity,
        through: "CountryActivity",
      },
    ],
  });
};

module.exports = {
  getAllCountries,
  getCoutryByName,
  getDetailCountry,
};
