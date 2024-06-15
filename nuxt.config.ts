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
    future: {
        compatibilityVersion: 4,
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
                    src: "icons/windows11/SmallTile.scale-100.png",
                    sizes: "71x71",
                },
                {
                    src: "icons/windows11/SmallTile.scale-125.png",
                    sizes: "89x89",
                },
                {
                    src: "icons/windows11/SmallTile.scale-150.png",
                    sizes: "107x107",
                },
                {
                    src: "icons/windows11/SmallTile.scale-200.png",
                    sizes: "142x142",
                },
                {
                    src: "icons/windows11/SmallTile.scale-400.png",
                    sizes: "284x284",
                },
                {
                    src: "icons/windows11/Square150x150Logo.scale-100.png",
                    sizes: "150x150",
                },
                {
                    src: "icons/windows11/Square150x150Logo.scale-125.png",
                    sizes: "188x188",
                },
                {
                    src: "icons/windows11/Square150x150Logo.scale-150.png",
                    sizes: "225x225",
                },
                {
                    src: "icons/windows11/Square150x150Logo.scale-200.png",
                    sizes: "300x300",
                },
                {
                    src: "icons/windows11/Square150x150Logo.scale-400.png",
                    sizes: "600x600",
                },
                {
                    src: "icons/windows11/Wide310x150Logo.scale-100.png",
                    sizes: "310x150",
                },
                {
                    src: "icons/windows11/Wide310x150Logo.scale-125.png",
                    sizes: "388x188",
                },
                {
                    src: "icons/windows11/Wide310x150Logo.scale-150.png",
                    sizes: "465x225",
                },
                {
                    src: "icons/windows11/Wide310x150Logo.scale-200.png",
                    sizes: "620x300",
                },
                {
                    src: "icons/windows11/Wide310x150Logo.scale-400.png",
                    sizes: "1240x600",
                },
                {
                    src: "icons/windows11/LargeTile.scale-100.png",
                    sizes: "310x310",
                },
                {
                    src: "icons/windows11/LargeTile.scale-125.png",
                    sizes: "388x388",
                },
                {
                    src: "icons/windows11/LargeTile.scale-150.png",
                    sizes: "465x465",
                },
                {
                    src: "icons/windows11/LargeTile.scale-200.png",
                    sizes: "620x620",
                },
                {
                    src: "icons/windows11/LargeTile.scale-400.png",
                    sizes: "1240x1240",
                },
                {
                    src: "icons/windows11/Square44x44Logo.scale-100.png",
                    sizes: "44x44",
                },
                {
                    src: "icons/windows11/Square44x44Logo.scale-125.png",
                    sizes: "55x55",
                },
                {
                    src: "icons/windows11/Square44x44Logo.scale-150.png",
                    sizes: "66x66",
                },
                {
                    src: "icons/windows11/Square44x44Logo.scale-200.png",
                    sizes: "88x88",
                },
                {
                    src: "icons/windows11/Square44x44Logo.scale-400.png",
                    sizes: "176x176",
                },
                {
                    src: "icons/windows11/StoreLogo.scale-100.png",
                    sizes: "50x50",
                },
                {
                    src: "icons/windows11/StoreLogo.scale-125.png",
                    sizes: "63x63",
                },
                {
                    src: "icons/windows11/StoreLogo.scale-150.png",
                    sizes: "75x75",
                },
                {
                    src: "icons/windows11/StoreLogo.scale-200.png",
                    sizes: "100x100",
                },
                {
                    src: "icons/windows11/StoreLogo.scale-400.png",
                    sizes: "200x200",
                },
                {
                    src: "icons/windows11/SplashScreen.scale-100.png",
                    sizes: "620x300",
                },
                {
                    src: "icons/windows11/SplashScreen.scale-125.png",
                    sizes: "775x375",
                },
                {
                    src: "icons/windows11/SplashScreen.scale-150.png",
                    sizes: "930x450",
                },
                {
                    src: "icons/windows11/SplashScreen.scale-200.png",
                    sizes: "1240x600",
                },
                {
                    src: "icons/windows11/SplashScreen.scale-400.png",
                    sizes: "2480x1200",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-16.png",
                    sizes: "16x16",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-20.png",
                    sizes: "20x20",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-24.png",
                    sizes: "24x24",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-30.png",
                    sizes: "30x30",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-32.png",
                    sizes: "32x32",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-36.png",
                    sizes: "36x36",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-40.png",
                    sizes: "40x40",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-44.png",
                    sizes: "44x44",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-48.png",
                    sizes: "48x48",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-60.png",
                    sizes: "60x60",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-64.png",
                    sizes: "64x64",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-72.png",
                    sizes: "72x72",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-80.png",
                    sizes: "80x80",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-96.png",
                    sizes: "96x96",
                },
                {
                    src: "icons/windows11/Square44x44Logo.targetsize-256.png",
                    sizes: "256x256",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",
                    sizes: "16x16",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",
                    sizes: "20x20",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",
                    sizes: "24x24",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",
                    sizes: "30x30",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",
                    sizes: "32x32",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",
                    sizes: "36x36",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",
                    sizes: "40x40",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",
                    sizes: "44x44",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",
                    sizes: "48x48",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",
                    sizes: "60x60",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",
                    sizes: "64x64",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",
                    sizes: "72x72",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",
                    sizes: "80x80",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",
                    sizes: "96x96",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
                    sizes: "256x256",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",
                    sizes: "16x16",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",
                    sizes: "20x20",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",
                    sizes: "24x24",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",
                    sizes: "30x30",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",
                    sizes: "32x32",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",
                    sizes: "36x36",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",
                    sizes: "40x40",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",
                    sizes: "44x44",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",
                    sizes: "48x48",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",
                    sizes: "60x60",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",
                    sizes: "64x64",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",
                    sizes: "72x72",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",
                    sizes: "80x80",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",
                    sizes: "96x96",
                },
                {
                    src: "icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",
                    sizes: "256x256",
                },
                {
                    src: "icons/android/android-launchericon-512-512.png",
                    sizes: "512x512",
                },
                {
                    src: "icons/android/android-launchericon-192-192.png",
                    sizes: "192x192",
                },
                {
                    src: "icons/android/android-launchericon-144-144.png",
                    sizes: "144x144",
                },
                {
                    src: "icons/android/android-launchericon-96-96.png",
                    sizes: "96x96",
                },
                {
                    src: "icons/android/android-launchericon-72-72.png",
                    sizes: "72x72",
                },
                {
                    src: "icons/android/android-launchericon-48-48.png",
                    sizes: "48x48",
                },
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
