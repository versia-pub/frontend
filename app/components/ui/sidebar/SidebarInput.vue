<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Input as InputVue } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <InputVue
        data-slot="sidebar-input"
        data-sidebar="input"
        :class="cn(
      'bg-background h-8 w-full shadow-none',
      props.class,
    )"
    >
        <slot/>
    </InputVue>
</template>
