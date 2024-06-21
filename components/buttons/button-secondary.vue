<template>
    <ButtonBase
        class="[--btn-border:theme(colors.zinc.950/90%)] [--btn-bg:theme(colors.zinc.800)] [--btn-hover-overlay:theme(colors.white/5%)] [--btn-icon:theme(colors.zinc.400)] active:[--btn-icon:theme(colors.zinc.300)] hover:[--btn-icon:theme(colors.zinc.300)] after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] border border-white/5"
        v-bind="$props" :loading="loading">
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