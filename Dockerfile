FROM oven/bun:1.1.4-alpine AS base

# Install dependencies into temp directory
# This will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

FROM base AS builder
COPY . /app

COPY --from=install /temp/dev/node_modules /app/node_modules
RUN cd /app && bun run build

FROM base as final

COPY --from=builder /app/.output/ /app

RUN bun add --global serve

LABEL org.opencontainers.image.authors "Gaspard Wierzbinski (https://cpluspatch.com)"
LABEL org.opencontainers.image.source "https://github.com/lysand-org/lysand-fe"
LABEL org.opencontainers.image.vendor "Lysand Org"
LABEL org.opencontainers.image.licenses "AGPL-3.0"
LABEL org.opencontainers.image.title "Lysand-FE"
LABEL org.opencontainers.image.description "Frontend for the Lysand Project"

WORKDIR /app/server
CMD ["bunx", "serve", "public"]