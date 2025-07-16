<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { type AlertVariants, alertVariants } from ".";

const props = defineProps<{
    class?: HTMLAttributes["class"];
    variant?: AlertVariants["variant"];
    layout?: AlertVariants["layout"];
}>();
</script>

<template>
  <div
    data-slot="alert"
    :class="cn(alertVariants({ variant, layout }), props.class)"
    role="alert"
  >
    <slot />
  </div>
</template>
