const cards = require('express').Router();
const { celebrate } = require('celebrate');
const cardController = require('../controllers/cards');
const { objectIdSchema, cardSchema } = require('../joi-shemas/index');
const {
  verifyUserObjectId,
  verifyCardObjectId,
} = require('../middlewares/object-id');

cards.get('/cards', verifyUserObjectId, cardController.getCards);
cards.delete(
  '/cards/:id',
  verifyUserObjectId,
  verifyCardObjectId,
  celebrate({ params: objectIdSchema }),
  cardController.deleteCard
);
cards.post(
  '/cards',
  verifyUserObjectId,
  celebrate({ body: cardSchema }),
  cardController.createCard
);
cards.delete(
  '/cards/:id/likes',
  verifyUserObjectId,
  verifyCardObjectId,
  celebrate({ params: objectIdSchema }),
  cardController.dislikeCard
);
cards.put(
  '/cards/:id/likes',
  verifyUserObjectId,
  verifyCardObjectId,
  celebrate({ params: objectIdSchema }),
  cardController.likeCard
);

module.exports = cards;
