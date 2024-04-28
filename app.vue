<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
useServerSeoMeta({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} · Lysand` : "Lysand";
    },
});

// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId());

const code = useRequestURL().searchParams.get("code");
const appData = useAppData();
const tokenData = useTokenData();
const client = useMegalodon(tokenData);
const me = useMe();

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
                tokenData.value = res;

                // Remove code from URL
                window.history.replaceState(
                    {},
                    document.title,
                    window.location.pathname,
                );
            });
    }
}

watch(tokenData, async () => {
    if (tokenData.value && !me.value) {
        const response = await client.value?.verifyAccountCredentials()

        if (response?.data) {
            me.value = response.data;
        }
    }
}, { immediate: true })
</script>

<style>
body {
    font-family: Inter, sans-serif;
}
</style>