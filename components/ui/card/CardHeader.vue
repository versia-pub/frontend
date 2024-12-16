<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Primitive, type PrimitiveProps } from "radix-vue";
import type { HTMLAttributes } from "vue";

const props = withDefaults(
    defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(),
    {
        as: "div",
    },
);
</script>

<template>
    <Primitive :as="props.as" :as-child="props.asChild" :class="cn('flex flex-col gap-y-1.5 p-6', props.class)">
        <slot />
    </Primitive>
</template>
