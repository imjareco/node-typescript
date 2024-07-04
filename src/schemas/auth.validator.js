import Joi from 'joi';
import { fieldSchemes } from './utils.js'; 

export const authSchema = {
  login: Joi.object().options({ abortEarly: false }).keys({
    login: Joi.string().required().description('Username or Email'),
    password: fieldSchemes.password.required(),
  }),


  register: Joi.object().options({ abortEarly: false }).keys({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    email: fieldSchemes.email.required(),
    password: fieldSchemes.password.required(),
    phone: Joi.number().integer().required(),
    adress: Joi.string().required(),
    location: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.number().integer().required()
  }),
};
