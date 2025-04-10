<template>
    <Button variant="ghost" class="max-w-14 w-full">
        <component :is="icon" class="size-4.5" />
        <slot />
    </Button>
</template>

<script lang="ts" setup>
import type { FunctionalComponent } from "vue";
import { Button } from "../ui/button";

const { icon } = defineProps<{
    icon: FunctionalComponent;
}>();
</script>
