import Joi from 'joi';
import { fieldSchemes, genericSchemes } from './utils.js';

export const userValidatorSchema = {
  get: genericSchemes.idSchema,

  put: Joi.object().options({ abortEarly: false }).keys({
    name: Joi.string(),
    lastname: Joi.string(),
    username: Joi.string(),
    email: fieldSchemes.email,
    password: fieldSchemes.password,
  }),

  delete: genericSchemes.idSchema,
};


