<template>
    <slot/>
</template>

<script lang="ts" setup>
const root = useParentElement(useParentElement());
// Store and keep y to restore it on page change
const route = useRoute();
const yStored = useLocalStorage("versia:scroll", {
    [route.fullPath]: 0,
});
const { y } = useScroll(root);

useEventListener("popstate", async () => {
    if (yStored.value[route.fullPath] !== undefined) {
        // Wait for the Vue component to load
        await new Promise((resolve) => setTimeout(resolve, 100));
        y.value = yStored.value[route.fullPath] ?? 0;
    }
});

onBeforeRouteLeave(() => {
    yStored.value[route.fullPath] = y.value;
    yStored.value = { ...yStored.value };
});
</script>
