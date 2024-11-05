FROM imbios/bun-node:22-alpine AS base

# Install dependencies into temp directory
# This will cache them and speed up future builds
FROM base AS install

RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

FROM base AS builder

COPY . /app
COPY --from=install /temp/dev/node_modules /app/node_modules
RUN cd /app && bun run emojis:generate
RUN cd /app && bun run build --preset node-server

FROM oven/bun:1.1.34-alpine AS final

COPY --from=builder /app/.output/ /app

LABEL org.opencontainers.image.authors="Gaspard Wierzbinski (https://cpluspatch.com)"
LABEL org.opencontainers.image.source="https://github.com/versia-pub/frontend"
LABEL org.opencontainers.image.vendor="Versia"
LABEL org.opencontainers.image.licenses="AGPL-3.0"
LABEL org.opencontainers.image.title="Versia-FE"
LABEL org.opencontainers.image.description="Frontend for the Versia Server Project"

WORKDIR /app
CMD ["bun", "run", "server/index.mjs"]