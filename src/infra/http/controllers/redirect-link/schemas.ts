import { z } from 'zod';

export const shortenedCodeParamSchema = z.string();

export type ShortenedCodeParamType = z.infer<typeof shortenedCodeParamSchema>;
