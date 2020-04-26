const error = require('express').Router();

error.get('*', (req, res) => {
  res.send({ "message": "Запрашиваемый ресурс не найден" });
});

module.exports = error;
