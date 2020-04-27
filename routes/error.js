const error = require('express').Router();

error.get('*', (req, res) => {
  res.setHeader('Content-type', 'application/json');
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
});

error.post('*', (req, res) => {
  res.setHeader('Content-type', 'application/json');
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
});

error.delete('*', (req, res) => {
  res.setHeader('Content-type', 'application/json');
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
});

error.patch('*', (req, res) => {
  res.setHeader('Content-type', 'application/json');
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
});

module.exports = error;
