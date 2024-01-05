import { z } from 'zod';

export const querySchema = z.object({
  page: z.coerce.number().positive().int(),
  quantityPerPage: z.coerce.number().positive().int(),
});

export type QuerySchemaType = z.infer<typeof querySchema>;
