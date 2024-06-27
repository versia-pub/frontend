<template>
    <iconify-icon data-slot="icon" :icon="icon" width="none" />
</template>

<script lang="ts" setup>
import "iconify-icon";

const props = defineProps<{
    icon: string;
}>();
</script>