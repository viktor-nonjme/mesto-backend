/* eslint-disable prettier/prettier */
const userModel = require('../models/user');

const getUsers = (req, res, next) => {
  return userModel
    .find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res) => {
  return userModel
    .findById(req.params.id)
    .then((user) => {
      if(user !== null) {
        res.json(user);
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    })
    .catch(() => {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return userModel
    .create({ name, about, avatar })
    .then((user) => {
      res.json(user);
    })
    .catch(() => res.status(400).send({ message: 'Ошибка при создании пользователя' }));
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  userModel
    .findByIdAndUpdate(userId, { name, about }, {
      new: true,
      runValidators: true,
      upsert: true
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  userModel
    .findByIdAndUpdate(
      userId,
      { avatar },
      {
      new: true,
      runValidators: true,
      upsert: true
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateAvatar
};
