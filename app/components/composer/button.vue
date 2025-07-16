<template>
    <Tooltip>
        <TooltipTrigger as="div">
            <slot />
        </TooltipTrigger>
        <TooltipContent>
            <p>{{ tooltip }}</p>
        </TooltipContent>
    </Tooltip>
</template>

<script lang="ts" setup>
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const { tooltip } = defineProps<{
    tooltip: string;
}>();
</script>
