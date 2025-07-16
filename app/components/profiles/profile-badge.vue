<template>
    <Tooltip>
        <TooltipTrigger :as-child="true">
            <Badge variant="default" class="gap-1">
                <BadgeCheck v-if="verified" />
                <img v-else-if="icon" :src="icon" alt="" class="size-4 rounded" />
                {{ name }}
            </Badge>
        </TooltipTrigger>
        <TooltipContent v-if="description">
            <Text>{{ description }}</Text>
        </TooltipContent>
    </Tooltip>
</template>

<script lang="ts" setup>
import { BadgeCheck } from "lucide-vue-next";
import { Badge } from "~/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "~/components/ui/tooltip";
import Text from "../typography/text.vue";

defineProps<{
    name: string;
    description?: string;
    icon?: string;
    verified?: boolean;
}>();
</script>
