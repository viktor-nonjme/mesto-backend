/* eslint-disable prettier/prettier */
const cardMolel = require('../models/card');
const UnauthorizedError = require('../errors/unauthorized-error');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');

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
    .catch(() => next(new BadRequestError('Ошибка при создании карточки')));
};

const deleteCard = (req, res, next) => {
  cardMolel.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Нет карточки с таким id');
    })
    .then(card => {
      if (card.owner._id.toString() !== req.user._id) {
         throw new UnauthorizedError('Не хватает прав');
      }
      return cardMolel.findByIdAndDelete(req.params.id)
        .then(cardById => {
          res.send({ data: cardById });
        })
        .catch(next);
    })
    .catch(next);
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
