const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const login = (req, res) => {
  const { email, password } = req.body;

  userModel
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

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
      if (user !== null) {
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
  const { email, password, name, about, avatar } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) =>
      userModel.create({
        email: req.body.email,
        password: `${hash}`,
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
      })
    )
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch(() =>
      res.status(400).send({ message: 'Ошибка при создании пользователя' })
    );
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  userModel
    .findByIdAndUpdate(
      userId,
      { name, about },
      {
        new: true,
        runValidators: true,
        upsert: true,
      }
    )
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
        upsert: true,
      }
    )
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  login,
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
};
