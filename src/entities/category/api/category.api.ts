import {
  createPaginatedResponseSchema,
  createPaginationSearchParams,
  registryHttpClient,
} from '@/shared/api';
import { CACHE_REVALIDATE } from '@/shared/config';

import { categorySchema } from '../model/category';

const paginatedCategorySchema = createPaginatedResponseSchema(categorySchema);

export const categoryApi = {
  getAllRoots: (limit: number = 20, offset: number = 0) =>
    registryHttpClient(
      `/categories/root?${createPaginationSearchParams(limit, offset)}`,
      paginatedCategorySchema,
      { next: { revalidate: CACHE_REVALIDATE.LONG } },
    ),

  getBySlug: (slug: string) =>
    registryHttpClient(`/categories/slug/${encodeURIComponent(slug)}`, categorySchema, {
      next: { revalidate: CACHE_REVALIDATE.LONG },
    }),

  getById: (id: string) =>
    registryHttpClient(`/categories/${encodeURIComponent(id)}`, categorySchema, {
      next: { revalidate: CACHE_REVALIDATE.LONG },
    }),

  getChildren: (id: string, limit: number = 20, offset: number = 0) =>
    registryHttpClient(
      `/categories/${encodeURIComponent(id)}/children?${createPaginationSearchParams(limit, offset)}`,
      paginatedCategorySchema,
      { next: { revalidate: CACHE_REVALIDATE.LONG } },
    ),
};
