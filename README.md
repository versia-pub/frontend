<p align="center">
  <a href="https://lysand.org"><img src="https://cdn.lysand.org/logo-long-dark.webp" alt="Lysand Logo" height="110"></a>
</p>

<center><h1><code>lysand-fe</code></h1></center>

**Lysand-FE** is a beautiful, fast and responsive front-end for the Lysand project.

## Features

- [x] Timelines: public, home, local
- [x] Login
- [x] Notifications
- [x] Replies
- [x] Quotes
- [x] Markdown posts (quasi-unrestricted)
- [x] Dark mode
- [x] Following
- [x] Multiple accounts
- [x] Custom Emojis
- [x] Lysand Permissions support
- [x] Note editing
- [x] Alt text support everywhere
- [x] Media uploads
- [x] WCAG 2.2 AAA compliance
  - Testing is automated and may not catch all issues, please report any accessibility issues you find.
- [x] Settings
- [x] Profile editing

### Browser Support

The following browsers are **supported** (issues will be prioritized):
- **Chromium**: `110+`
- **Firefox**: `110+`
- **Safari**: `16+`
- **IE**: None.

The following browsers will very likely work, but are not officially supported:
- **Chromium**: `80+`
- **Firefox**: `80+`
- **Safari**: `12+`
- **IE**: None.

Other browsers may work, but are not guaranteed to.

## Performance

### JavaScript Bloat

The **total** JavaScript bundle size is less than `900 kB`, but this is made even smaller by the fact that the bundle is split into multiple files, and only the necessary files are loaded on each page.

### Benchmarks

Benchmarks are due to be conducted soon™.

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

## License

This project is licensed under the AGPL 3.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

### Projects

- [**Bun**](https://bun.sh): Thanks to the Bun team for creating an amazing JavaScript runtime.
- [**Nuxt**](https://nuxt.com): Thanks to the Nuxt team for creating an amazing Vue framework.

### People

- [**April John**](https://github.com/cutestnekoaqua): Creator and maintainer of the Lysand Server ActivityPub bridge.