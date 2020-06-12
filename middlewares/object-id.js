const { ObjectId } = require('mongodb');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');

module.exports.verifyCardObjectId = (req, res, next) =>
  ObjectId.isValid(req.params.id)
    ? next()
    : next(new BadRequestError('ID пользователя не соответствует'));

module.exports.verifyUserObjectId = (req, res, next) =>
  ObjectId.isValid(req.user._id)
    ? next()
    : next(new BadRequestError('ID пользователя не соответствует'));

module.exports.compareUserObjectIdAndCardId = (req, res, next) =>
  req.user._id === req.params.id
    ? next()
    : next(new UnauthorizedError('Нужна авторизация'));
