import Joi from 'joi';
import { fieldSchemes } from './utils.js'; 

export const authSchema = {
  login: Joi.object().options({ abortEarly: false }).keys({
    email: fieldSchemes.email.required(),
    password: fieldSchemes.password.required(),
  }),

  register: Joi.object().options({ abortEarly: false }).keys({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    email: fieldSchemes.email.required(),
    password: fieldSchemes.password.required(),
  }),
};