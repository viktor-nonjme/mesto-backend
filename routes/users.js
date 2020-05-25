const users = require('express').Router();
const { celebrate } = require('celebrate');
const {
  objectIdSchema,
  userInfoSchema,
  // eslint-disable-next-line prettier/prettier
  userAvatarSchema
} = require('../joi-shemas/index');

const userController = require('../controllers/users');

users.get('/users', userController.getUsers);
users.get(
  '/users/:id',
  celebrate({ params: objectIdSchema }),
  userController.getUserById
);
users.patch(
  '/users/:userId',
  celebrate({ params: objectIdSchema, body: userInfoSchema }),
  userController.updateUser
);
users.patch(
  '/users/:userId/avatar',
  celebrate({
    params: objectIdSchema,
    body: userAvatarSchema,
  }),
  userController.updateAvatar
);

module.exports = users;
