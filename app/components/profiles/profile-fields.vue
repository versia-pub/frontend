<template>
    <Column class="gap-y-4">
        <Column
            v-for="field in fields"
            :key="field.name"
            class="gap-1 break-words"
        >
            <HeadingSmall v-render-emojis="emojis">
                {{ field.name }}
            </HeadingSmall>
            <Html v-html="field.value" v-render-emojis="emojis" />
        </Column>
    </Column>
</template>

<script lang="ts" setup>
import type { CustomEmoji, Field } from "@versia/client/schemas";
import type { z } from "zod";
import HeadingSmall from "~/components/typography/headings/small.vue";
import Html from "../typography/html.vue";
import Column from "../typography/layout/col.vue";

defineProps<{
    fields: z.infer<typeof Field>[];
    emojis: z.infer<typeof CustomEmoji>[];
}>();
</script>
