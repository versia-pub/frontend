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
import { nanoid } from "nanoid";
// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId());

const code = useRequestURL().searchParams.get("code");
const appData = useAppData();
const identity = useCurrentIdentity();
const identities = useIdentities();
const client = useClient();
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
            .then(async (res) => {
                const tempClient = useClient(res.data).value;

                const [accountOutput, instanceOutput] = await Promise.all([
                    tempClient.verifyAccountCredentials(),
                    tempClient.getInstance(),
                ]);

                // Get account data
                if (
                    !identities.value.find(
                        (i) => i.account.id === accountOutput.data.id,
                    )
                )
                    identity.value = {
                        id: nanoid(),
                        tokens: res.data,
                        account: accountOutput.data,
                        instance: instanceOutput.data,
                        permissions: [],
                        emojis: [],
                    };

                // Remove code from URL
                window.history.replaceState(
                    {},
                    document.title,
                    window.location.pathname,
                );

                // Redirect to home
                window.location.pathname = "/";
            });
    }
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
</style>