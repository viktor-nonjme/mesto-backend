const { Joi } = require('celebrate');

module.exports.linkSchema = Joi.string()
  .required()
  .regex(/:\/\/[0-9a-z-.]+\.[a-z]+\//i)
  .uri({
    scheme: [/https?/],
  });
