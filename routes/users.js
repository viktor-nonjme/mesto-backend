const users = require('express').Router();
const { celebrate } = require('celebrate');
const {
  objectIdSchema,
  userInfoSchema,
  // eslint-disable-next-line prettier/prettier
  userAvatarSchema
} = require('../joi-shemas/index');
const {
  compareUserObjectIdAndCardId,
  verifyUserObjectId,
} = require('../middlewares/object-id');

const userController = require('../controllers/users');

users.get('/users', userController.getUsers);
users.get(
  '/users/:id',
  celebrate({ params: objectIdSchema }),
  userController.getUserById
);
users.patch(
  '/users/:id',
  celebrate({ params: objectIdSchema, body: userInfoSchema }),
  verifyUserObjectId,
  compareUserObjectIdAndCardId,
  userController.updateUser
);
users.patch(
  '/users/:id/avatar',
  celebrate({
    params: objectIdSchema,
    body: userAvatarSchema,
  }),
  verifyUserObjectId,
  compareUserObjectIdAndCardId,
  userController.updateAvatar
);

module.exports = users;
