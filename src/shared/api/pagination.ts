import { z } from 'zod';

export const paginatedMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
  offset: z.number().int().nonnegative(),
});

export function createPaginatedResponseSchema<T extends z.ZodType>(itemSchema: T) {
  return z.object({
    items: z.array(itemSchema),
    meta: paginatedMetaSchema,
  });
}

export function createPaginationSearchParams(limit: number, offset: number): URLSearchParams {
  return new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });
}

export type PaginatedMeta = z.infer<typeof paginatedMetaSchema>;

export type PaginatedResponse<T> = {
  items: ReadonlyArray<T>;
  meta: PaginatedMeta;
};
