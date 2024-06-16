<template>
    <InputsText type="checkbox" v-bind="$attrs, $props"
        class="rounded disabled:hover:cursor-wait text-primary-700 !size-5" />
</template>

<script lang="ts" setup>
import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {}

defineProps<Props>();
</script>