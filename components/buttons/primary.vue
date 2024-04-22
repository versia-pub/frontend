<template>
    <ButtonsBase class="bg-pink-500 hover:bg-pink-400">
        <slot />
    </ButtonsBase>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {}

defineProps<Props>();
</script>

<style></style>