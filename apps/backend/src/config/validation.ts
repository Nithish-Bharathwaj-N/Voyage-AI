import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required().description('PostgreSQL connection url'),
  SUPABASE_URL: Joi.string().uri().required().description('Supabase instance url'),
  SUPABASE_ANON_KEY: Joi.string().required().description('Supabase public anonymous key'),
  SUPABASE_SERVICE_ROLE_KEY: Joi.string()
    .required()
    .description('Supabase service role secret key'),
  SUPABASE_JWT_SECRET: Joi.string().required().description('Supabase JWT signing secret key'),
  REDIS_URL: Joi.string().required().description('Redis instance connection url'),
  // External integrations — all optional, features degrade gracefully if absent
  GOOGLE_MAPS_API_KEY: Joi.string().optional().description('Google Maps Geocoding API key'),
  GOOGLE_PLACES_API_KEY: Joi.string().optional().description('Google Places API key'),
  OPENWEATHER_API_KEY: Joi.string().optional().description('OpenWeatherMap API key'),
  OPEN_EXCHANGE_RATES_APP_ID: Joi.string().optional().description('Open Exchange Rates app ID'),
  TIMEZONE_API_KEY: Joi.string().optional().description('Timezone API key'),
  OPENTRIPMAP_API_KEY: Joi.string().optional().description('OpenTripMap API key'),
  // Integration tuning
  INTEGRATION_TIMEOUT_MS: Joi.number().default(5000).description('External API timeout in ms'),
  INTEGRATION_MAX_RETRIES: Joi.number().default(3).description('Max retry attempts per request'),
  INTEGRATION_RETRY_DELAY_MS: Joi.number().default(300).description('Base retry delay in ms'),
});
