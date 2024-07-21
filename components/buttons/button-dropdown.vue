<template>
    <ButtonBase class="enabled:hover:bg-white/20 text-sm !rounded-sm !ring-0 !py-3 sm:!py-1.5 sm:!px-2 !justify-start">
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