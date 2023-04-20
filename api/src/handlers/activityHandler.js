const getActivityHandler = (req, res) => {
  res.status(200).send(`Todos las actividades`);
};

module.exports = getActivityHandler;
