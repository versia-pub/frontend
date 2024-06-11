// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxtjs/seo",
        "@nuxtjs/tailwindcss",
        "@vueuse/nuxt",
        "nuxt-headlessui",
        "@nuxt/fonts",
        "@vee-validate/nuxt",
        "nuxt-security",
        "@vite-pwa/nuxt",
    ],
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => tag === "iconify-icon",
        },
    },
    pwa: {
        manifest: {
            name: "Lysand",
            short_name: "Lysand",
            description: "Frontend for the Lysand social network",
            theme_color: "#f9a8d4",
            display: "standalone",
            lang: "en",
            categories: ["social", "development"],
        },
    },
    security: {
        headers: {
            // Nuxt DevTools
            crossOriginEmbedderPolicy:
                process.env.NODE_ENV === "development"
                    ? "unsafe-none"
                    : "require-corp",
            contentSecurityPolicy: {
                "img-src": ["'self'", "data:", "https:", "blob:"],
                "script-src": ["'nonce-{{nonce}}'", "'strict-dynamic'"],
                // Allow all origins for form-action, so that clients registering custom
                // protocol handlers will work (native clients for example)
                "form-action": ["*"],
                "media-src": ["'self'", "https:", "blob:"],
            },
            crossOriginResourcePolicy: "cross-origin",
            xFrameOptions: "DENY",
            permissionsPolicy: {
                fullscreen: ["'self'", "blob:"],
            },
        },
        rateLimiter: {
            headers: true,
            tokensPerInterval: 300,
            interval: 300000,
        },
    },
    app: {
        head: {
            link: [
                {
                    rel: "icon",
                    href: "/favicon.png",
                    type: "image/png",
                },
                {
                    rel: "apple-touch-icon",
                    href: "/favicon.png",
                    type: "image/png",
                },
            ],
            htmlAttrs: { lang: "en-us" },
        },
        keepalive: true,
    },
    nitro: {
        preset: "bun",
        minify: true,
        prerender: {
            failOnError: true,
        },
        compressPublicAssets: {
            brotli: false,
            gzip: false,
        },
    },
    schemaOrg: {
        enabled: false,
    },
    ogImage: {
        enabled: false,
    },
    veeValidate: {
        autoImports: true,
        componentNames: {
            Form: "VeeForm",
            Field: "VeeField",
            FieldArray: "VeeFieldArray",
            ErrorMessage: "VeeErrorMessage",
        },
    },
    runtimeConfig: {
        public: {
            language: "en-US",
            titleSeparator: "·",
            siteName: "Lysand",
            trailingSlash: true,
            apiHost: "https://social.lysand.org",
        },
    },
    imports: {
        presets: [
            {
                from: "overlayscrollbars-vue",
                imports: ["OverlayScrollbarsComponent"],
            },
        ],
    },
    site: {
        url: "https://social.lysand.org",
    },
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
});
