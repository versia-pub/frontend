<template>
    <TooltipProvider>
        <Component is="style">{{ preferences.custom_css }}</Component>
        <NuxtPwaAssets/>
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>
        <ConfirmationModal/>
        <!-- pointer-events-auto fixes https://github.com/unovue/shadcn-vue/issues/462 -->
        <Toaster class="pointer-events-auto"/>
    </TooltipProvider>
</template>

<script setup lang="ts">
import { convert } from "html-to-text";
import { overwriteGetLocale } from "../paraglide/runtime";
import ConfirmationModal from "./components/modals/confirm.vue";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";

// Sin
//import "~/styles/mcdonalds.css";

const lang = useLanguage();
const authStore = useAuthStore();
overwriteGetLocale(() => lang.value);

const description = useExtendedDescription();

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
    title: computed(() => authStore.instance?.title ?? ""),
    ogImage: computed(() => authStore.instance?.banner?.url),
    twitterTitle: computed(() => authStore.instance?.title ?? ""),
    twitterDescription: computed(() =>
        convert(description.value?.content ?? ""),
    ),
    twitterImage: computed(() => authStore.instance?.banner?.url),
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

useCacheRefresh();
</script>

<style>
@import "tailwindcss";
@import "./styles/index.css";

body {
    font-family: Inter, sans-serif;
}

html.theme-changing * {
    /* Stroke and fill aren't animatable */
    transition:
        background-color 1s ease,
        border 1s ease,
        color 1s ease,
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
