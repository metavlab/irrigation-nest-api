import * as Joi from 'joi';

export const ConfigValidationSchema = Joi.object({
  STAGE: Joi.string().valid('dev', 'prod', 'test', '').default(''),
  server: Joi.object({
    port: Joi.number().default(3000).required(),
  }),
  app: Joi.object({
    apiPrefix: Joi.string().optional(),
    collectionsResources: Joi.string().default('').optional().default('no'),
    'app.collectionsResources': Joi.valid('yes', 'no', '0', '1'),
  }),
  mysql: Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
    issuer: Joi.string().optional(),
    expirein: Joi.string()
      .regex(/^\d+(s|m|h|d|y)?$/)
      .optional()
      .default('7d'),
  }),
});
