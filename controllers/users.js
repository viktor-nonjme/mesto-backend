const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const { createToken } = require('../utils/token');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-error');

const login = (req, res, next) => {
  const { email, password } = req.body;

  userModel
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = createToken(user);

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        // eslint-disable-next-line prettier/prettier
        sameSite: true
      });

      res.status(200).send({ token });
    })
    .catch(next);
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

const getUserById = (req, res, next) => {
  return userModel
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  return bcrypt
    .hash(req.body.password, 10)
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
      next(
        new ConflictError(
          'Ошибка при создании пользователя или email уже используется'
        )
      )
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
  // eslint-disable-next-line prettier/prettier
  updateAvatar
};
