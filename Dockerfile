FROM oven/bun:1.1.38-alpine AS base

# Install dependencies into temp directory
# This will cache them and speed up future builds
FROM base AS install

RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --production --frozen-lockfile

FROM base AS builder

COPY . /app
COPY --from=install /temp/dev/node_modules /app/node_modules
RUN cd /app && bun run emojis:generate
RUN cd /app && bun run build

# Run final web server
FROM ghcr.io/static-web-server/static-web-server:2-alpine AS final

COPY --from=builder /app/.output/public /app/public
COPY sws.toml /etc/config.toml

LABEL org.opencontainers.image.authors="Gaspard Wierzbinski (https://cpluspatch.com)"
LABEL org.opencontainers.image.source="https://github.com/versia-pub/frontend"
LABEL org.opencontainers.image.vendor="Versia"
LABEL org.opencontainers.image.licenses="AGPL-3.0"
LABEL org.opencontainers.image.title="Versia-FE"
LABEL org.opencontainers.image.description="Frontend for the Versia Server Project"

WORKDIR /app
EXPOSE 3000
CMD ["static-web-server", "--config-file", "/etc/config.toml"]