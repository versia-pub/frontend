<template>
    <slot/>
    <ComposerDialog v-if="authStore.isSignedIn"/>
</template>

<script lang="ts" setup>
import ComposerDialog from "~/components/composer/dialog.vue";

const authStore = useAuthStore();
</script>
