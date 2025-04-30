<template>
    <TooltipProvider>
        <Component is="style">
            {{ preferences.custom_css }}
        </Component>
        <NuxtPwaAssets />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <ConfirmationModal />
        <!-- pointer-events-auto fixes https://github.com/unovue/shadcn-vue/issues/462 -->
        <Toaster class="pointer-events-auto" />
    </TooltipProvider>
</template>

<script setup lang="ts">
import { convert } from "html-to-text";
import ConfirmationModal from "./components/modals/confirm.vue";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { overwriteGetLocale } from "./paraglide/runtime";
// Sin
//import "~/styles/mcdonalds.css";

const lang = useLanguage();
overwriteGetLocale(() => lang.value);

const code = useRequestURL().searchParams.get("code");
const origin = useRequestURL().searchParams.get("origin");
const appData = useAppData();
const instance = useInstance();
const description = useExtendedDescription(client);
const route = useRoute();

// Theme switcher
const colorMode = useColorMode();
const radius = useCssVar("--radius");

watch(preferences.color_theme, (newVal) => {
    // Add theme-changing class to html to trigger transition
    document.documentElement.classList.add("theme-changing");
    colorMode.preference = newVal;

    setTimeout(() => {
        // Remove theme-changing class after transition
        document.documentElement.classList.remove("theme-changing");
    }, 1000);
});

watch(
    preferences.border_radius,
    (newVal) => {
        radius.value = `${newVal}rem`;
    },
    {
        immediate: true,
    },
);

useSeoMeta({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} · Versia` : "Versia";
    },
    title: computed(() => instance.value?.title ?? ""),
    ogImage: computed(() => instance.value?.banner?.url),
    twitterTitle: computed(() => instance.value?.title ?? ""),
    twitterDescription: computed(() =>
        convert(description.value?.content ?? ""),
    ),
    twitterImage: computed(() => instance.value?.banner?.url),
    description: computed(() => convert(description.value?.content ?? "")),
    ogDescription: computed(() => convert(description.value?.content ?? "")),
    ogSiteName: "Versia",
    colorScheme: "dark",
    themeColor: "#f9a8d4",
});

useHead({
    htmlAttrs: {
        lang: "en",
    },
});

if (code && origin && appData.value && route.path !== "/oauth/code") {
    const newOrigin = new URL(
        URL.canParse(origin) ? origin : `https://${origin}`,
    );

    signInWithCode(code, appData.value, newOrigin);
}

if (origin && !code) {
    const newOrigin = new URL(
        URL.canParse(origin) ? origin : `https://${origin}`,
    );

    signIn(appData, newOrigin);
}

useListen("identity:change", (newIdentity) => {
    identity.value = newIdentity;
    window.location.pathname = "/";
});

useCacheRefresh(client);
</script>

<style>
@import "tailwindcss";
@import "./styles/index.css";

body {
    font-family: Inter, sans-serif;
}

html.theme-changing * {
    /* Stroke and fill aren't animatable */
    transition: background-color 1s ease, border 1s ease, color 1s ease,
        box-shadow 1s ease !important;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100%);
}
</style>
