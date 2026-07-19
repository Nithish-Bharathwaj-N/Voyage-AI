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
# Set default fake env keys for Next.js build compilation step
ENV NEXT_PUBLIC_SUPABASE_URL=https://mock.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=mock-anon-key
ENV NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.mock
RUN pnpm run build

# --- Production Runtime ---
FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY package.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public

EXPOSE 3000
CMD ["npm", "run", "start"]
