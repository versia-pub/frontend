<template>
    <ClientOnly>
        <Component is="style">
            {{ customCss.value }}
        </Component>
    </ClientOnly>
    <NuxtPwaAssets />
    <ClientOnly>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <NotificationsRenderer />
        <ConfirmationModal />
    </ClientOnly>
</template>

<script setup lang="ts">
import "~/styles/theme.css";
import "~/styles/index.css";
import { convert } from "html-to-text";
import "iconify-icon";
import ConfirmationModal from "./components/modals/confirmation.vue";
import NotificationsRenderer from "./components/notifications/notifications-renderer.vue";
import { SettingIds } from "./settings";
// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId());

const code = useRequestURL().searchParams.get("code");
const appData = useAppData();
const instance = useInstance();
const description = useExtendedDescription(client);
const customCss = useSetting(SettingIds.CustomCSS);

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
    noscript: [
        {
            innerHTML: `<div class="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8 fixed inset-0 z-[1000000] bg-dark-900" data-v-inspector="components/errors/noscript.vue:2:5"><svg class="absolute inset-0 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true" data-v-inspector="components/graphics/square-pattern.vue:2:5"><defs data-v-inspector="components/graphics/square-pattern.vue:4:9"><pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse" data-v-inspector="components/graphics/square-pattern.vue:5:13"><path d="M.5 200V.5H200" fill="none" data-v-inspector="components/graphics/square-pattern.vue:7:17"></path></pattern></defs><svg x="50%" y="-1" class="overflow-visible fill-gray-800/20" data-v-inspector="components/graphics/square-pattern.vue:9:16"><path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0" data-v-inspector="components/graphics/square-pattern.vue:10:13"></path></svg><rect width="100%" height="100%" stroke-width="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" data-v-inspector="components/graphics/square-pattern.vue:13:9"></rect></svg><div class="prose prose-invert max-w-lg" data-v-inspector="components/errors/noscript.vue:4:9"><h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-100 sm:text-5xl" data-v-inspector="components/errors/noscript.vue:5:13">JavaScript is disabled </h1><p class="mt-6 text-base leading-7 text-gray-400" data-v-inspector="components/errors/noscript.vue:7:13"> This website requires JavaScript to function properly. Please enable JavaScript in your browser settings. </p><p class="mt-6 text-base leading-7 text-gray-400" data-v-inspector="components/errors/noscript.vue:11:13"> If you are using a browser that does not support JavaScript, please consider using a modern browser like <a href="https://www.mozilla.org/firefox/new/" class="underline" data-v-inspector="components/errors/noscript.vue:13:22">Firefox</a> or <a href="https://www.google.com/chrome/" class="underline" data-v-inspector="components/errors/noscript.vue:13:102">Chrome</a>. </p><p class="mt-6 text-base leading-7 text-gray-400" data-v-inspector="components/errors/noscript.vue:16:13"> This application does not track you, collect user data, use cookies of any kind or send requests to servers outside of your account&#39;s instance. </p></div></div>`,
        },
    ],
});

if (code && appData.value) {
    signInWithCode(code, appData.value);
}

useListen("identity:change", (newIdentity) => {
    identity.value = newIdentity;
    window.location.pathname = "/";
});

useCacheRefresh(client);
</script>

<style>
@import url("overlayscrollbars/overlayscrollbars.css");

body {
    font-family: Inter, sans-serif;
}

.os-scrollbar .os-scrollbar-handle {
    background: #9999;
}

.os-scrollbar .os-scrollbar-handle:hover {
    background: #6666;
}
</style>