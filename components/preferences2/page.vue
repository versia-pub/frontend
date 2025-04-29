<template>
    <section class="gap-4 flex flex-col">
        <h2 class="text-xl font-bold tracking-tight">
            {{ title }}
        </h2>

        <slot />
    </section>
</template>

<script lang="ts" setup>
const { title } = defineProps<{
    title: string;
}>();
</script>
