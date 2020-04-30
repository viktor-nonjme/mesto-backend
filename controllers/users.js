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

const getUserById = (req, res, next) => {
  return userModel
    .findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  return userModel
    .create({ name, about, avatar })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      next(err);
    });
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
