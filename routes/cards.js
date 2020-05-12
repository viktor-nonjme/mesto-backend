const cards = require('express').Router();
const cardController = require('../controllers/cards');

cards.get('/cards', cardController.getCards);
cards.delete('/cards/:id', cardController.deleteCard);
cards.post('/cards', cardController.createCard);

module.exports = cards;
