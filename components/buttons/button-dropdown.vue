<template>
    <ButtonBase class="enabled:hover:bg-white/20 !rounded-sm !ring-0 !p-4 sm:!p-2 !justify-start">
        <Icon :icon="icon" />
        <slot />
    </ButtonBase>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from "vue";
import ButtonBase from "~/packages/ui/components/buttons/button.vue";
import Icon from "~/packages/ui/components/icons/icon.vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {}

defineProps<
    Props & {
        icon: string;
    }
>();
</script>

<style></style>