<template>
    <input :class="['block disabled:opacity-70 disabled:hover:cursor-wait w-full bg-dark-500 rounded-md border-0 py-1.5 text-gray-50 shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6',
        isInvalid && '!ring-red-600 ring-2']">
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
    isInvalid?: boolean;
}

defineProps<Props>();
</script>