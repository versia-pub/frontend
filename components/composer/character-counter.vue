<template>
    <Tooltip>
        <TooltipTrigger as-child>
            <div v-bind="$attrs" class="m-1">
                <TriangleAlert v-if="isOverflowing" class="text-destructive-foreground size-6" />
                <svg v-else viewBox="0 0 100 100" class="transform rotate-[-90deg] size-6">
                    <!-- Background Circle -->
                    <circle cx="50" cy="50" r="46" stroke="currentColor" class="text-muted" stroke-width="8"
                        fill="none" />
                    <!-- Progress Circle -->
                    <circle cx="50" cy="50" r="46" stroke="currentColor" stroke-width="8" fill="none"
                        stroke-dasharray="100" :stroke-dashoffset="100 - percentage" pathLength="100"
                        stroke-linecap="round" class="text-accent-foreground transition-all duration-500" />
                </svg>
            </div>
        </TooltipTrigger>
        <TooltipContent class="text-center">
            <p>{{ current }} / {{ max }}</p>
            <p v-if="isOverflowing">Too long!</p>
        </TooltipContent>
    </Tooltip>
</template>

<script lang="ts" setup>
import { TriangleAlert } from "lucide-vue-next";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const { max, current } = defineProps<{
    max: number;
    current: number;
}>();

const percentage = computed(() => {
    return Math.min((current / max) * 100, 100);
});
const isOverflowing = computed(() => {
    return current > max;
});
</script>
