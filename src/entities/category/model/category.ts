import { z } from 'zod';

import { dateTimeSchema, idSchema, slugSchema } from '@/shared/api';

export const categorySchema = z.object({
  id: idSchema,
  name: z.string().min(1),
  slug: slugSchema,
  description: z.string().nullable(),
  parentId: idSchema.nullable(),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
  archivedAt: dateTimeSchema.nullable(),
});

export type Category = z.infer<typeof categorySchema>;
