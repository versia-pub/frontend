<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    data-slot="card-content"
    :class="cn('flex flex-col', props.class)"
  >
    <slot />
  </div>
</template>
