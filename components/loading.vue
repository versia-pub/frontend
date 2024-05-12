<template>
    <div v-if="loading" class="fixed inset-0 bg-black z-[500] flex items-center justify-center">
        <!-- Progress bar stuck to top -->
        <div class="fixed top-0 left-0 right-0 h-1.5 bg-pink-500" :style="{ width: `${progress}%` }"></div>
        <div class="flex flex-col items-center justify-center gap-8">
            <img src="https://cdn.lysand.org/logo.webp" class="size-20 animate-pulse" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const loading = ref(true);

const estimatedProgress = (duration: number, elapsed: number) =>
    (2 / Math.PI) * 100 * Math.atan(((elapsed / duration) * 100) / 50);

const progress = ref(0);
const timeAtStart = performance.now();
const app = useNuxtApp();

const duration = 3000;

useIntervalFn(() => {
    const elapsed = performance.now() - timeAtStart;
    progress.value = estimatedProgress(duration, elapsed);
}, 1000 / 60);

app.hook("page:finish", async () => {
    // Wait until page has loaded for at least 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loading.value = false;
});
</script>