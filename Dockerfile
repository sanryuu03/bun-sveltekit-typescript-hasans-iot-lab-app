# --- Stage 1: install dependencies produksi dengan Bun ---
FROM oven/bun:1-alpine AS deps

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production && bun pm cache rm

# --- Stage 2: runner (runtime Node) ---
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

# Salin folder build hasil kompilasi lokal (jalankan `bun run build` sebelum docker build)
COPY build ./build

EXPOSE 3000

CMD ["node", "build"]
