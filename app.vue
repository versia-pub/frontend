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
</script>

<style>
body {
    font-family: Inter, sans-serif;
}
</style>