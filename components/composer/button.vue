<template>
    <button v-bind="$props"
        :class="['rounded text-text-300 hover:bg-background-900/70 p-2 flex items-center justify-center duration-200', toggled && 'bg-primary-500/70 hover:bg-primary-900/70']">
        <slot />
    </button>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {}

defineProps<
    Props & {
        toggled?: boolean;
    }
>();
</script>