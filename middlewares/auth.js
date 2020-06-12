const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/token');
const UnauthorizedError = require('../errors/unauthorized-error');

module.exports.authorization = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!jwt) {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(new UnauthorizedError('Нужна авторизация'));
    }
    const tok = authorization.replace('Bearer ', '');

    let payload;

    try {
      payload = jwt.verify(tok);
    } catch (err) {
      return next(new UnauthorizedError('Нужна авторизация'));
    }

    req.user = payload;

    return next();
  }

  let payload;

  try {
    payload = verifyToken(token);
  } catch (err) {
    return next(new UnauthorizedError('Нужна авторизация'));
  }

  req.user = payload;

  return next();
};
