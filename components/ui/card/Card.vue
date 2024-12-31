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
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="
      cn(
        'rounded-lg border bg-card/20 backdrop-blur-xl text-card-foreground shadow-sm',
        props.class,
      )
    "
    data-component="card"
  >
    <slot />
  </Primitive>
</template>
