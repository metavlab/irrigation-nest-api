import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().default(''),
  PORT: Joi.number().default(3000).required(),
  APP_PREFIX: Joi.string().default(''),
});
