import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .default('postgresql://docker:docker@localhost:5432/shorten-url'),
  JWT_SECRET: z.string().default('secret'),
  APP_BASE_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;
