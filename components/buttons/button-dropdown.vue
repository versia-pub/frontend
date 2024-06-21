<template>
    <ButtonBase class="enabled:hover:bg-white/20 !rounded-sm !text-left flex flex-row gap-x-3 !ring-0 !p-4 sm:!p-2">
        <iconify-icon :icon="icon" width="none" class="text-gray-200 size-5" aria-hidden="true" />
        <slot />
    </ButtonBase>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from "vue";
import ButtonBase from "./button-base.vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {}

defineProps<
    Props & {
        icon: string;
    }
>();
</script>

<style></style>