<template>
    <ButtonsBase class="bg-white/10 hover:bg-white/20">
        <slot />
    </ButtonsBase>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {}

defineProps<Props>();
</script>

<style></style>