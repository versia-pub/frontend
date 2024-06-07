<template>
    <NuxtPwaAssets />
    <PwaTransparentImage image="/logo.webp" />
    <PwaAppleImage image="/logo.webp" />
    <PwaMaskableImage image="/logo.webp" />
    <Loading />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <NotificationsRenderer />
</template>

<script setup lang="ts">
import { convert } from "html-to-text";
import "iconify-icon";
// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId());

const code = useRequestURL().searchParams.get("code");
const appData = useAppData();
const tokenData = useTokenData();
const client = useClient(tokenData);
const instance = useInstance();
const description = useExtendedDescription(client);

useSeoMeta({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} · Lysand` : "Lysand";
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
    ogSiteName: "Lysand",
    colorScheme: "dark",
    themeColor: "#f9a8d4",
});

useHead({
    htmlAttrs: {
        lang: "en",
    },
});

if (code) {
    if (appData.value) {
        client.value
            ?.fetchAccessToken(
                appData.value.client_id,
                appData.value.client_secret,
                code,
                new URL("/", useRequestURL().origin).toString(),
            )
            .then((res) => {
                tokenData.value = res.data;

                // Remove code from URL
                window.history.replaceState(
                    {},
                    document.title,
                    window.location.pathname,
                );
            });
    }
}

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
</style>