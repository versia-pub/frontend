<template>
    <AttachmentBase :attachment="attachment" lightbox>
        <img :src="attachment.url" :alt="attachment.description ?? undefined">
    </AttachmentBase>
</template>

<script lang="ts" setup>
import type { Attachment } from "@versia/client/schemas";
import type { z } from "zod";
import AttachmentBase from "./attachment-base.vue";

const { attachment } = defineProps<{
    attachment: z.infer<typeof Attachment>;
}>();
</script>
