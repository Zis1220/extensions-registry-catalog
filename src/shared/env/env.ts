import 'server-only';
import { z } from 'zod';

const urlSchema = z.string().url().transform(normalizeUrl);

const envSchema = z.object({
  CATALOG_URL: urlSchema,
  REGISTRY_API_URL: urlSchema,
});

const parsed = envSchema.parse({
  CATALOG_URL: process.env.CATALOG_URL,
  REGISTRY_API_URL: process.env.REGISTRY_API_URL,
});

export const env = {
  CATALOG_URL: parsed.CATALOG_URL,
  REGISTRY_API_URL: parsed.REGISTRY_API_URL,
} as const;

function normalizeUrl(value: string) {
  const url = new URL(value).toString();
  return url.endsWith('/') ? url : `${url}/`;
}
