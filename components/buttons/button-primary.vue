<template>
    <ButtonBase :loading="loading"
        class="[--btn-border:theme(colors.primary.950/90%)] [--btn-bg:theme(colors.primary.600)] [--btn-hover-overlay:theme(colors.white/5%)] [--btn-icon:theme(colors.primary.400)] active:[--btn-icon:theme(colors.primary.300)] hover:[--btn-icon:theme(colors.primary.300)] after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] border border-white/5"
        v-bind="$props">
        <slot />
    </ButtonBase>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from "vue";
import ButtonBase from "./button-base.vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {}

defineProps<
    Props & {
        loading?: boolean;
    }
>();
</script>

<style></style>