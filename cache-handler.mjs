import { PHASE_PRODUCTION_BUILD } from "next/constants.js";

import { CacheHandler } from "@fortedigital/nextjs-cache-handler";
import createLruHandler from "@fortedigital/nextjs-cache-handler/local-lru";
import createRedisHandler from "@fortedigital/nextjs-cache-handler/redis-strings";

import { createClient } from "redis";

const isBuildPhase = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD;
const isDevelopment = process.env.NODE_ENV === "development";

CacheHandler.onCreation(() => {
  if (globalThis.__cacheHandlerConfig) {
    return globalThis.__cacheHandlerConfig;
  }

  if (globalThis.__cacheHandlerConfigPromise) {
    return globalThis.__cacheHandlerConfigPromise;
  }

  globalThis.__cacheHandlerConfigPromise = createCacheHandlerConfig();

  return globalThis.__cacheHandlerConfigPromise;
});

async function createCacheHandlerConfig() {
  if (isBuildPhase || isDevelopment) {
    return rememberCacheHandlerConfig({
      handlers: [createLruHandler()],
    });
  }

  if (process.env.REDIS_CACHE_ENABLED !== "true") {
    throw new Error(
      "REDIS_CACHE_ENABLED must be set to 'true' in production runtime.",
    );
  }

  if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL is required when REDIS_CACHE_ENABLED=true.");
  }

  const redisClient = createClient({
    url: process.env.REDIS_URL,
    pingInterval: 10_000,
  });

  redisClient.on("error", (err) => {
    console.warn("[cache-handler] Redis error:", err);

    globalThis.__cacheHandlerConfig = null;
    globalThis.__cacheHandlerConfigPromise = null;
  });

  await redisClient.connect();

  return rememberCacheHandlerConfig({
    handlers: [
      createRedisHandler({
        client: redisClient,
        keyPrefix: process.env.REDIS_CACHE_KEY_PREFIX ?? "catalog:",
      }),
    ],
  });
}

function rememberCacheHandlerConfig(config) {
  globalThis.__cacheHandlerConfigPromise = null;
  globalThis.__cacheHandlerConfig = config;

  return config;
}

export default CacheHandler;