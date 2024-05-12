<template>
    <ButtonsBase
        class="bg-white/10 hover:bg-white/20 !text-left flex flex-row gap-x-3 !rounded-none !ring-0 !p-4 sm:!p-3">
        <iconify-icon :icon="icon" width="1.25rem" height="1.25rem" class="text-gray-200" aria-hidden="true" />
        <slot />
    </ButtonsBase>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {}

defineProps<
    Props & {
        icon: string;
    }
>();
</script>

<style></style>