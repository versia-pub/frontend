<template>
    <button v-bind="$props" type="button"
        class="rounded-md duration-200 hover:shadow disabled:opacity-70 disabled:cursor-wait px-3 py-2 text-sm font-semibold text-white shadow-sm">
        <slot />
    </button>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {}

defineProps<Props>();
</script>

<style></style>