<template>
    <Button variant="ghost" class="max-w-14 w-full" size="sm">
        <component :is="icon" class="size-4" />
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
