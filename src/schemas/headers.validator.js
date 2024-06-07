import Joi from 'joi';

export const headersSchema = {
  // UNUSED
  secure: Joi.object()
    .options({ abortEarly: false })
    .keys({
      'user-session': Joi.string().base64().required(),
      'session-token': Joi.string().alphanum().min(3).max(200).required(),
    }),
};