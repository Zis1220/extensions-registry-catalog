import { z } from 'zod';

import { dateTimeSchema, idSchema } from '@/shared/api';

export const resourceReleaseSchema = z.object({
  id: idSchema,
  fileKey: z.string().min(1),
  resourceId: idSchema,
  version: z.string().min(1),
  changelog: z.string(),
  publisherId: idSchema,
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
  yankedAt: dateTimeSchema.nullable(),
});

export type ResourceRelease = z.infer<typeof resourceReleaseSchema>;
