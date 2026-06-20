FROM node:24-alpine AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1


FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci


FROM base AS builder

ARG CATALOG_URL
ARG REGISTRY_API_URL

ENV CATALOG_URL=${CATALOG_URL}
ENV REGISTRY_API_URL=${REGISTRY_API_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN mkdir -p public
RUN npm run build


FROM base AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/cache-handler.mjs ./cache-handler.mjs

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]