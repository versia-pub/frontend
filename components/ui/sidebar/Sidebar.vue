<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
        side?: "left" | "right";
        variant?: "sidebar" | "floating" | "inset";
        collapsible?: "offcanvas" | "icon" | "none";
        class?: HTMLAttributes["class"];
    }>(),
    {
        side: "left",
        variant: "sidebar",
        collapsible: "offcanvas",
    },
);
</script>

<template>
    <aside
        :class="cn('flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground p-1', props.class)"
        v-bind="$attrs" data-component="sidebar">
        <slot />
    </aside>
</template>
