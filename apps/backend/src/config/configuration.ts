export interface IntegrationsConfig {
  googleMapsApiKey?: string;
  googlePlacesApiKey?: string;
  openWeatherApiKey?: string;
  openExchangeRatesAppId?: string;
  timezoneApiKey?: string;
  openTripMapApiKey?: string;
  // Timeouts (ms)
  defaultTimeoutMs: number;
  // Retry policy
  maxRetries: number;
  retryDelayMs: number;
}

export interface AppConfig {
  environment: string;
  port: number;
  database: {
    url?: string;
  };
  supabase: {
    url?: string;
    anonKey?: string;
    serviceRoleKey?: string;
    jwtSecret?: string;
  };
  redis: {
    url?: string;
  };
  integrations: IntegrationsConfig;
}

export default (): AppConfig => ({
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    jwtSecret: process.env.SUPABASE_JWT_SECRET,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  integrations: {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY,
    openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
    openExchangeRatesAppId: process.env.OPEN_EXCHANGE_RATES_APP_ID,
    timezoneApiKey: process.env.TIMEZONE_API_KEY,
    openTripMapApiKey: process.env.OPENTRIPMAP_API_KEY,
    defaultTimeoutMs: parseInt(process.env.INTEGRATION_TIMEOUT_MS || '5000', 10),
    maxRetries: parseInt(process.env.INTEGRATION_MAX_RETRIES || '3', 10),
    retryDelayMs: parseInt(process.env.INTEGRATION_RETRY_DELAY_MS || '300', 10),
  },
});
