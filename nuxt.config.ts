// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxtjs/seo",
        "@nuxtjs/tailwindcss",
        "@vueuse/nuxt",
        "nuxt-headlessui",
        "@nuxt/fonts",
        "nuxt-icon",
        "@vee-validate/nuxt",
        //"nuxt-shiki",
    ],

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

    vite: {
        define: {
            __VERSION__: JSON.stringify("0.4"),
        },
        server: {
            hmr: {
                clientPort: 3000,
                host: "localhost",
                protocol: "ws",
            },
        },
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

    site: {
        url: "https://social.lysand.org",
    },

    devtools: {
        enabled: true,
    },
});
