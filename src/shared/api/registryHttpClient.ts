import type { z, ZodType } from 'zod';

import { env } from '@/shared/env';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly path: string,
    public readonly body?: unknown,
  ) {
    super(`API error: ${status} ${statusText} ${path}`);
    this.name = 'ApiError';
  }
}

export function isApiError(error: unknown, status?: number): error is ApiError {
  return error instanceof ApiError && (status === undefined || error.status === status);
}

async function readErrorBody(res: Response): Promise<unknown> {
  const contentType = res.headers.get('content-type') ?? '';

  try {
    if (contentType.includes('application/json')) {
      return await res.json();
    }

    return await res.text();
  } catch {
    return undefined;
  }
}

export async function registryHttpClient<TSchema extends ZodType>(
  path: string,
  schema: TSchema,
  options?: RequestInit & { next?: NextFetchRequestConfig },
): Promise<z.output<TSchema>> {
  const url = new URL(path.replace(/^\//, ''), env.REGISTRY_API_URL);
  const headers = new Headers(options?.headers);

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new ApiError(res.status, res.statusText, path, await readErrorBody(res));
  }

  const data: unknown = await res.json();

  return schema.parse(data);
}
