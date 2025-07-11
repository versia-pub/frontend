<template>
    <slot />
    <ComposerDialog v-if="identity" />
</template>

<script lang="ts" setup>
import ComposerDialog from "~/components/composer/dialog.vue";
</script>
