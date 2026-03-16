FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN apk upgrade --no-cache
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk upgrade --no-cache

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build -- --no-lint

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

COPY package*.json ./
RUN apk upgrade --no-cache \
	&& npm ci --omit=dev \
	&& npm cache clean --force \
	&& rm -f package*.json \
	&& rm -rf /usr/local/lib/node_modules/npm \
	&& rm -f /usr/local/bin/npm /usr/local/bin/npx

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["node", "node_modules/next/dist/bin/next", "start"]
