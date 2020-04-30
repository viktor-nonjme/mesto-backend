/* eslint-disable prettier/prettier */
const cardMolel = require('../models/card');

const getCards = (req, res, next) => {
  return cardMolel
    .find({})
    .populate('owner')
    .then((cards) => {
      res.json(cards);
    })
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link, likes } = req.body;
  const userId = req.user._id;
  return cardMolel
    .create({ name, link, owner: userId, likes })
    .then((card) => {
      res.json(card);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  cardMolel
    .findByIdAndRemove(req.params.id)
    .then((card) => {
      res.json(card);
    })
    .catch((err) => {
      next(err);
    });
};

const likeCard = (req, res, next) => {
  const cardId = req.params.id;
  const user = req.user._id;
  cardMolel
    .findByIdAndUpdate(cardId, { $addToSet: { likes: user } }, { new: true })
    .then((card) => {
      res.json(card);
    })
    .catch((err) => {
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  const cardId = req.params.id;
  const user = req.user._id;
  cardMolel
    .findByIdAndUpdate(cardId, { $pull: { likes: user } }, { new: true })
    .then((card) => {
      res.json(card);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};
