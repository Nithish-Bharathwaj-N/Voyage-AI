import { z } from 'zod';

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url(),
  GEMINI_API_KEY: z.string().min(1),
  REDIS_URL: z.string().url().optional(),
  MAPBOX_ACCESS_TOKEN: z.string().min(1).optional(),
});

export type EnvConfig = z.infer<typeof EnvSchema>;
