<p align="center">
  <a href="https://lysand.org"><img src="https://cdn.lysand.org/logo-long-dark.webp" alt="Lysand Logo" height="110"></a>
</p>

# Lysand-FE

**Lysand-FE** is a beautiful, fast and responsive front-end for the Lysand project.

## Features

- [x] Timelines: public, home, local
- [x] Login
- [x] Notifications
- [x] Replies
- [x] Quotes
- [x] Markdown posts
- [x] Dark mode
- [x] Following
- [ ] Settings
- [ ] Profile editing

## Tech Stack

- [**Nuxt**](https://nuxt.com) - The Intuitive Vue Framework
- [**TailwindCSS**](https://tailwindcss.com) - A utility-first CSS framework
- [**TypeScript**](https://typescriptlang.org) - A typed superset of JavaScript

## Installation

Lysand-FE is included in the provided `docker-compose` file during [Lysand Server installation](https://github.com/lysand-org/lysand/blob/main/docs/installation.md).

To have Lysand-FE and Lysand Server running on the same domain, edit the Lysand Server configuration to point to the Lysand-FE container's address (`frontend` category inside config).

### Manual Installation

Here are the steps to install Lysand-FE manually:

#### Docker/Podman

```yaml
services:
    fe:
        image: ghcr.io/lysand-org/lysand-fe:main
        container_name: lysand-fe
        restart: unless-stopped
        networks:
            - lysand-net
        environment:
            NUXT_PUBLIC_API_HOST: https://yourserver.com
```

Then, the frontend will be available at `http://localhost:3000` inside the container. To link it to a Lysand Server, set the `NUXT_PUBLIC_API_HOST` environment variable to the server's URL.