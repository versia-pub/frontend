<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { Primitive, type PrimitiveProps } from "radix-vue";
import type { HTMLAttributes } from "vue";
import { NuxtLink } from "#components";

const props = withDefaults(
    defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(),
    {
        as: NuxtLink,
    },
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('transition-colors hover:text-foreground', props.class)"
  >
    <slot />
  </Primitive>
</template>
