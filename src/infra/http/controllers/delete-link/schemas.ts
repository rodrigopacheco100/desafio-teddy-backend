import { z } from 'zod';

export const linkIdParamSchema = z.string().uuid();

export type LinkIdParamType = z.infer<typeof linkIdParamSchema>;
