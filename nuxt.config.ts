// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxtjs/seo",
        "@nuxtjs/tailwindcss",
        "@vueuse/nuxt",
        "nuxt-headlessui",
        "@nuxt/fonts",
        "nuxt-icon",
        //"nuxt-shiki",
        "@vee-validate/nuxt",
        "nuxt-security",
    ],
    security: {
        headers: {
            // Nuxt DevTools
            crossOriginEmbedderPolicy:
                process.env.NODE_ENV === "development"
                    ? "unsafe-none"
                    : "require-corp",
            contentSecurityPolicy: {
                "img-src": ["'self'", "data:", "https:"],
                "script-src": ["'nonce-{{nonce}}'", "'strict-dynamic'"],
                // Add https because of some browsers blocking form-action to 'self' if the page is from a redirect
                "form-action": ["'self'", "https:"],
            },
            crossOriginResourcePolicy: "same-origin",
            xFrameOptions: "DENY",
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
            ],
            htmlAttrs: { lang: "en-us" },
        },
        keepalive: true,
    },
    /*     shiki: {
        defaultTheme: "rose-pine",
        bundledLangs: [
            "javascript",
            "typescript",
            "html",
            "css",
            "json",
            "python",
            "toml",
            "rust",
            "sql",
            "scss",
            "bash",
            "shell",
            "yaml",
        ],
    }, */
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
    },
});
