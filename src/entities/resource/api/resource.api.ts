import {
  createPaginatedResponseSchema,
  createPaginationSearchParams,
  registryHttpClient,
} from '@/shared/api';
import { CACHE_REVALIDATE } from '@/shared/config';

import { resourceListItemSchema, resourceSchema } from '../model/resource';

const paginatedResourceListItemSchema = createPaginatedResponseSchema(resourceListItemSchema);

export const resourceApi = {
  getAll: (limit = 20, offset = 0) =>
    registryHttpClient(
      `/resources?${createPaginationSearchParams(limit, offset)}`,
      paginatedResourceListItemSchema,
      { next: { revalidate: CACHE_REVALIDATE.SHORT } },
    ),

  getByCategory: (categoryId: string, limit = 20, offset = 0) =>
    registryHttpClient(
      `/resources/category/${encodeURIComponent(categoryId)}?${createPaginationSearchParams(limit, offset)}`,
      paginatedResourceListItemSchema,
      { next: { revalidate: CACHE_REVALIDATE.SHORT } },
    ),

  getByPublisher: (publisherId: string, limit = 20, offset = 0) =>
    registryHttpClient(
      `/resources/publisher/${encodeURIComponent(publisherId)}?${createPaginationSearchParams(limit, offset)}`,
      paginatedResourceListItemSchema,
      { next: { revalidate: CACHE_REVALIDATE.SHORT } },
    ),

  getBySlug: (slug: string) =>
    registryHttpClient(`/resources/slug/${encodeURIComponent(slug)}`, resourceSchema, {
      next: { revalidate: CACHE_REVALIDATE.MEDIUM },
    }),
};
