const { Joi } = require('celebrate');

module.exports.passwordSchema = Joi.string().alphanum().required().min(8);
