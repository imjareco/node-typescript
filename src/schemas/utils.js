const Joi = require('joi');

const fieldSchemes = {
  email: Joi.string().email(),
  password: Joi.string().min(6).max(1024),
};

const genericSchemes = {
  idSchema: Joi.object().keys({
    id: Joi.string().min(1).required(),
  }),
};

module.exports = {
  genericSchemes,
  fieldSchemes,
};
