<template>
    <div class="sticky top-2 z-10 flex items-center justify-center p-2">
        <Badge variant="secondary">{{ categoryName }}</Badge>
    </div>
</template>

<script lang="ts" setup>
import { Badge } from "~/components/ui/badge";

const { categoryName } = defineProps<{
    categoryName: string;
}>();
</script>
