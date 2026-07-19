# --- Base ---
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./

# --- Dependencies ---
FROM base AS dependencies
RUN pnpm install --frozen-lockfile

# --- Build ---
FROM base AS build
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN pnpm prisma generate
RUN pnpm run build
RUN pnpm prune --prod

# --- Production Runtime ---
FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY package.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma

EXPOSE 3000
CMD ["node", "dist/src/main"]
