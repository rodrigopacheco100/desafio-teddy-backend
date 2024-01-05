import { z } from 'zod';

export const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type BodyType = z.infer<typeof bodySchema>;
