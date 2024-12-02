<template>
    <div class="flex flex-col gap-y-4">
        <div v-for="field in fields" :key="field.name" class="flex flex-col gap-1">
            <h3 class="font-semibold text-sm">{{ field.name }}</h3>
            <div v-html="field.value" class="prose prose-sm prose-zinc dark:prose-invert"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Field } from "@versia/client/types";

defineProps<{
    fields: Field[];
}>();
</script>