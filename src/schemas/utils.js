import Joi from 'joi';

export const fieldSchemes = {
  email: Joi.string().email(),
  password: Joi.string().min(6).max(1024),
};

export const genericSchemes = {
  idSchema: Joi.object().keys({
    id: Joi.string().min(1).required(),
  }),
};
