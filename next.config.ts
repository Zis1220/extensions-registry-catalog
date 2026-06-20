import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',

  cacheMaxMemorySize: 0, // disable default in-memory caching
  cacheHandler: require.resolve('./cache-handler.mjs'),

  outputFileTracingRoot: __dirname,
  reactCompiler: true,
  transpilePackages: [
    '@mantine/core', 
    '@mantine/hooks', 
    '@mantine/notifications'
  ],
};

export default nextConfig;
