<template>
    <TooltipProvider>
        <Component is="style">
            {{ customCss.value }}
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
import "~/styles/index.css";
import { convert } from "html-to-text";
import ConfirmationModal from "./components/modals/confirm.vue";
import { Toaster } from "./components/ui/sonner";
import { setLanguageTag } from "./paraglide/runtime";
import { type EnumSetting, SettingIds } from "./settings";
// Sin
//import "~/styles/mcdonalds.css";

const lang = useLanguage();
setLanguageTag(lang.value);

const code = useRequestURL().searchParams.get("code");
const appData = useAppData();
const instance = useInstance();
const description = useExtendedDescription(client);
const customCss = useSetting(SettingIds.CustomCSS);
const route = useRoute();

// Theme switcher
const theme = useSetting(SettingIds.Theme) as Ref<EnumSetting>;
const colorMode = useColorMode();

watch(theme.value, () => {
    // Add theme-changing class to html to trigger transition
    document.documentElement.classList.add("theme-changing");
    colorMode.preference = theme.value.value;

    setTimeout(() => {
        // Remove theme-changing class after transition
        document.documentElement.classList.remove("theme-changing");
    }, 1000);
});

useSeoMeta({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} · Versia` : "Versia";
    },
    title: computed(() => instance.value?.title ?? ""),
    ogImage: computed(() => instance.value?.banner.url),
    twitterTitle: computed(() => instance.value?.title ?? ""),
    twitterDescription: computed(() =>
        convert(description.value?.content ?? ""),
    ),
    twitterImage: computed(() => instance.value?.banner.url),
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

if (code && appData.value && route.path !== "/oauth/code") {
    signInWithCode(code, appData.value);
}

useListen("identity:change", (newIdentity) => {
    identity.value = newIdentity;
    window.location.pathname = "/";
});

useCacheRefresh(client);
</script>

<style>
body {
    font-family: Inter, sans-serif;
}

html.theme-changing * {
    /* Stroke and fill aren't animatable */
    transition: background 1s ease, border 1s ease, color 1s ease, box-shadow 1s ease !important;
}
</style>
