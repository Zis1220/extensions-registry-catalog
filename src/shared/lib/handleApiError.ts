import { notFound } from 'next/navigation';

import { isApiError } from '@/shared/api';

export function handleApiError(error: unknown): never {
  if (isApiError(error, 404)) {
    notFound();
  }

  throw error;
}
