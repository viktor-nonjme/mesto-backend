const error = require('express').Router();

error.all('*', (req, res) => {
  res.setHeader('Content-type', 'application/json');
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = error;
