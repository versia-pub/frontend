<template>
    <!-- [&:has(>:last-child:nth-child(1))] means "when this element has 1 child" -->
    <div class="grid gap-4 grid-cols-2 *:max-h-56 [&:has(>:last-child:nth-child(1))]:grid-cols-1 sm:[&:has(>:last-child:nth-child(1))>*]:max-h-72">
        <Attachment v-for="attachment in attachments" :key="attachment.id" :attachment="attachment" />
    </div>
</template>

<script lang="ts" setup>
import type { Attachment as AttachmentType } from "@versia/client/schemas";
import type { z } from "zod";
import Attachment from "./attachment.vue";

defineProps<{
    attachments: z.infer<typeof AttachmentType>[];
}>();
</script>
