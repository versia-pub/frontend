<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <div
        :class="
            cn(
                'rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col gap-6 p-4 items-center justify-center',
                props.class
            )
        "
    >
        <slot />
    </div>
</template>
