<template>
    <ButtonBase
        class="hover:bg-white/5 text-xs max-w-full w-full gap-1 h-full !px-0 flex flex-col items-center justify-center">
        <iconify-icon :icon="icon" class="size-6" width="none" />
        <span class="text-xs hidden md:inline">{{ text }}</span>
    </ButtonBase>
</template>

<script lang="ts" setup>
import ButtonBase from "./button-base.vue";

defineProps<{
    icon: string;
    text: string;
}>();
</script>