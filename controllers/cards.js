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

const createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const userId = req.user._id;
  return cardMolel
    .create({ name, link, owner: userId, likes })
    .then((card) => {
      res.json(card);
    })
    .catch(() => res.status(400).send({ message: 'Ошибка при создании карточки' }));
};

const deleteCard = (req, res) => {
  cardMolel.findById(req.params.id)
    .orFail(() => new Error('Нет карточки с таким id'))
    .then(card => {
      if (card.owner._id.toString() !== req.user._id) {
        return res
          .status(401)
          .send({ message: 'Не хватает прав' });
      }
      return cardMolel.findByIdAndDelete(req.params.id)
        .then(cardById => {
          res.send({ data: cardById });
        })
        .catch(err => res.status(404).send({ message: err.message }));
    })
    .catch(err => res.status(404).send({ message: err.message }));
};

// const deleteCard = (req, res, next) => {
//   cardMolel
//     .findByIdAndRemove(req.params.id)
//     .then((card) => {
//       res.json(card);
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

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
