<template>
    <ButtonsBase class="bg-white/10 hover:bg-white/20" :loading="loading">
        <slot />
    </ButtonsBase>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {}

defineProps<
    Props & {
        loading?: boolean;
    }
>();
</script>

<style></style>