import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3001),
  DATABASE_URL: Joi.string().required(),
  OPENAI_API_KEY: Joi.string().optional().allow(''),
  GEMINI_API_KEY: Joi.string().optional().allow(''),
  ANTHROPIC_API_KEY: Joi.string().optional().allow(''),
  REDIS_URL: Joi.string().optional(),
  SUPABASE_URL: Joi.string().optional(),
  SUPABASE_KEY: Joi.string().optional(),
  JWT_SECRET: Joi.string().optional(), // In prod, this should be required
});
