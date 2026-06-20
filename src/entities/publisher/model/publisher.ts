import { z } from 'zod';

import { dateTimeSchema, idSchema, slugSchema } from '@/shared/api';

export const publisherSchema = z.object({
  id: idSchema,
  provider: z.string().min(1),
  identifier: z.string().min(1),
  slug: slugSchema,
  displayName: z.string().min(1),
  email: z.string().email().nullable().optional(),
  role: z.string().min(1),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
  archivedAt: dateTimeSchema.nullable(),
});

export type Publisher = z.infer<typeof publisherSchema>;
