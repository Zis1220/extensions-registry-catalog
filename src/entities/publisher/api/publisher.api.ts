import { registryHttpClient } from '@/shared/api';
import { CACHE_REVALIDATE } from '@/shared/config';

import { publisherSchema } from '../model/publisher';

export const publisherApi = {
  getBySlug: (slug: string) =>
    registryHttpClient(`/publishers/slug/${encodeURIComponent(slug)}`, publisherSchema, {
      next: { revalidate: CACHE_REVALIDATE.MEDIUM },
    }),

  getById: (id: string) =>
    registryHttpClient(`/publishers/${encodeURIComponent(id)}`, publisherSchema, {
      next: { revalidate: CACHE_REVALIDATE.MEDIUM },
    }),
};
