<template>
    <main class="from-dark-600 to-dark-900 bg-gradient-to-tl min-h-dvh pb-20 md:pb-0">
        <Navigation />
        <slot />
    </main>
</template>

<script lang="ts" setup>
import Navigation from "~/components/sidebars/navigation.vue";
</script>