<template>
    <slot />
</template>

<script lang="ts" setup>
const root = useParentElement();
// Store and keep y to restore it on page change
const route = useRoute();
const yStored = useLocalStorage(`lysand:scroll-${route.fullPath}`, 0);
const { y } = useScroll(root);

useEventListener("popstate", async (event) => {
    if (yStored.value !== null) {
        // Wait for the Vue component to load
        await new Promise((resolve) => setTimeout(resolve, 100));
        y.value = yStored.value;
    }
});

onBeforeRouteLeave(() => {
    yStored.value = y.value;
});
</script>