<template>
    <ButtonBase
        class="hover:bg-white/5 text-xs max-w-full w-full h-full !p-0">
        <iconify-icon :icon="icon" class="size-6" width="none" />
    </ButtonBase>
</template>

<script lang="ts" setup>
import ButtonBase from "~/packages/ui/components/buttons/button.vue";

defineProps<{
    icon: string;
    text: string;
}>();
</script>