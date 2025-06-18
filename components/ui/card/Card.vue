<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <div data-slot="card" :class="cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-md border p-4 shadow-sm',
        props.class,
    )
        ">
        <slot />
    </div>
</template>
