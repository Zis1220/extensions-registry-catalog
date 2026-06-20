import { z } from 'zod';

import { dateTimeSchema, idSchema, slugSchema } from '@/shared/api';

export const resourceSchema = z.object({
  id: idSchema,
  name: z.string().min(1),
  slug: slugSchema,
  description: z.string().nullable(),
  metaDescription: z.string(),
  keywords: z.array(z.string().min(1)),
  categoryId: idSchema,
  publisherId: idSchema,
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
  archivedAt: dateTimeSchema.nullable(),
});

export const resourceListItemSchema = resourceSchema.extend({
  publisher: z
    .object({
      displayName: z.string().min(1),
      slug: slugSchema,
    })
    .optional(),
  category: z
    .object({
      name: z.string().min(1),
      slug: slugSchema,
    })
    .optional(),
});

export type Resource = z.infer<typeof resourceSchema>;
export type ResourceListItem = z.infer<typeof resourceListItemSchema>;
