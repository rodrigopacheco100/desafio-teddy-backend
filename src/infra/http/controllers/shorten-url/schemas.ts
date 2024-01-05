import { z } from 'zod';

export const bodySchema = z.object({
  url: z.string().url(),
});

export type BodyType = z.infer<typeof bodySchema>;
