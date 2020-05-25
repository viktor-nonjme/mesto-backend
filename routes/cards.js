const cards = require('express').Router();
const { celebrate } = require('celebrate');
const cardController = require('../controllers/cards');
const { objectIdSchema, cardSchema } = require('../joi-shemas/index');

cards.get('/cards', cardController.getCards);
cards.delete(
  '/cards/:id',
  celebrate({ params: objectIdSchema }),
  cardController.deleteCard
);
cards.post(
  '/cards',
  celebrate({ body: cardSchema }),
  cardController.createCard
);

module.exports = cards;
