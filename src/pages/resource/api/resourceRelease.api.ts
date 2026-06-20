import {
  createPaginatedResponseSchema,
  createPaginationSearchParams,
  registryHttpClient,
} from '@/shared/api';
import { CACHE_REVALIDATE } from '@/shared/config';

import { resourceReleaseSchema } from '../model/resourceRelease';

const paginatedResourceReleaseSchema = createPaginatedResponseSchema(resourceReleaseSchema);

export const resourceReleaseApi = {
  getByResource: (resourceId: string, limit = 20, offset = 0) =>
    registryHttpClient(
      `/releases/resource/${encodeURIComponent(resourceId)}?${createPaginationSearchParams(limit, offset)}`,
      paginatedResourceReleaseSchema,
      { next: { revalidate: CACHE_REVALIDATE.SHORT } },
    ),
};
