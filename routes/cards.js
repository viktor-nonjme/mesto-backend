const cards = require('express').Router();

const cardsData = require('../data/cards.json');

cards.get('/cards', (req, res) => {
  res.send(cardsData);
});

module.exports = cards;
