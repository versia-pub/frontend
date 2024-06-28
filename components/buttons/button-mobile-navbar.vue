<template>
    <ButtonBase class="hover:bg-white/5 text-xs max-w-full w-full h-full !p-0">
        <Icon :icon="icon" class="!size-6" />
    </ButtonBase>
</template>

<script lang="ts" setup>
import ButtonBase from "~/packages/ui/components/buttons/button.vue";
import Icon from "~/packages/ui/components/icons/icon.vue";

defineProps<{
    icon: string;
    text: string;
}>();
</script>