<template>
    <div class="flex flex-col gap-y-4">
        <div v-for="field in fields" :key="field.name" class="flex flex-col gap-1 break-words">
            <h3 class="font-semibold text-sm" v-render-emojis="emojis">{{ field.name }}</h3>
            <div v-html="field.value" class="prose prose-sm prose-zinc dark:prose-invert" v-render-emojis="emojis"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CustomEmoji, Field } from "@versia/client/schemas";
import type { z } from "zod";

defineProps<{
    fields: z.infer<typeof Field>[];
    emojis: z.infer<typeof CustomEmoji>[];
}>();
</script>
