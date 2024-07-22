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
    components: {
        dirs: [],
    },
    future: {
        compatibilityVersion: 4,
    },
    compatibilityDate: "2024-07-21",
    pwa: {
        manifest: {
            name: "Lysand",
            short_name: "Lysand",
            description: "Frontend for the Lysand social network",
            theme_color: "#f9a8d4",
            background_color: "#131313",
            display: "standalone",
            lang: "en",
            categories: ["social", "development"],
            orientation: "natural",
            screenshots: [
                {
                    src: "screenshots/desktop/homepage.webp",
                    sizes: "1920x1049",
                    type: "image/webp",
                    form_factor: "wide",
                    label: "Homepage",
                },
                {
                    src: "screenshots/desktop/account.webp",
                    sizes: "1920x1049",
                    type: "image/webp",
                    form_factor: "wide",
                    label: "Viewing an account",
                },
                {
                    src: "screenshots/desktop/account-switcher.webp",
                    sizes: "1920x1049",
                    type: "image/webp",
                    form_factor: "wide",
                    label: "Account switcher",
                },
                {
                    src: "screenshots/mobile/homepage.webp",
                    sizes: "390x844",
                    type: "image/webp",
                    form_factor: "narrow",
                    label: "Homepage",
                },
                {
                    src: "screenshots/mobile/account.webp",
                    sizes: "390x844",
                    type: "image/webp",
                    form_factor: "narrow",
                    label: "Viewing an account",
                },
                {
                    src: "screenshots/mobile/account-switcher.webp",
                    sizes: "390x844",
                    type: "image/webp",
                    form_factor: "narrow",
                    label: "Account switcher",
                },
                {
                    src: "screenshots/mobile/note-menu.webp",
                    sizes: "390x844",
                    type: "image/webp",
                    form_factor: "narrow",
                    label: "Menu for a note",
                },
            ],
            icons: [
                {
                    src: "icons/ios/16.png",
                    sizes: "16x16",
                },
                {
                    src: "icons/ios/20.png",
                    sizes: "20x20",
                },
                {
                    src: "icons/ios/29.png",
                    sizes: "29x29",
                },
                {
                    src: "icons/ios/32.png",
                    sizes: "32x32",
                },
                {
                    src: "icons/ios/40.png",
                    sizes: "40x40",
                },
                {
                    src: "icons/ios/50.png",
                    sizes: "50x50",
                },
                {
                    src: "icons/ios/57.png",
                    sizes: "57x57",
                },
                {
                    src: "icons/ios/58.png",
                    sizes: "58x58",
                },
                {
                    src: "icons/ios/60.png",
                    sizes: "60x60",
                },
                {
                    src: "icons/ios/64.png",
                    sizes: "64x64",
                },
                {
                    src: "icons/ios/72.png",
                    sizes: "72x72",
                },
                {
                    src: "icons/ios/76.png",
                    sizes: "76x76",
                },
                {
                    src: "icons/ios/80.png",
                    sizes: "80x80",
                },
                {
                    src: "icons/ios/87.png",
                    sizes: "87x87",
                },
                {
                    src: "icons/ios/100.png",
                    sizes: "100x100",
                },
                {
                    src: "icons/ios/114.png",
                    sizes: "114x114",
                },
                {
                    src: "icons/ios/120.png",
                    sizes: "120x120",
                },
                {
                    src: "icons/ios/128.png",
                    sizes: "128x128",
                },
                {
                    src: "icons/ios/144.png",
                    sizes: "144x144",
                },
                {
                    src: "icons/ios/152.png",
                    sizes: "152x152",
                },
                {
                    src: "icons/ios/167.png",
                    sizes: "167x167",
                },
                {
                    src: "icons/ios/180.png",
                    sizes: "180x180",
                },
                {
                    src: "icons/ios/192.png",
                    sizes: "192x192",
                },
                {
                    src: "icons/ios/256.png",
                    sizes: "256x256",
                },
                {
                    src: "icons/ios/512.png",
                    sizes: "512x512",
                },
                {
                    src: "icons/ios/1024.png",
                    sizes: "1024x1024",
                },
            ],
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
    robots: {
        blockNonSeoBots: true,
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
            onionApiHost: undefined,
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
        enabled: false,

        timeline: {
            enabled: true,
        },
    },
});
