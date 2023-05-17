import * as Joi from 'joi';

// const EXPIRES_EXPRESSION_REGEX = '/^d+$/';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().default(''),
  PORT: Joi.number().default(3000).required(),
  APP_PREFIX: Joi.string().default(''),
  COLLECT_RESOURCES: Joi.valid('yes', 'no', '0', '1').optional().default('no'),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_EXPIREIN: Joi.string()
    .regex(/^\d+(s|m|h|d|y)?$/)
    .optional()
    .default('7d'),
});
