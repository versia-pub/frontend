<template>
    <ImageAttachment
        v-if="attachment.type === 'image'"
        :attachment="attachment"
    />
    <VideoAttachment
        v-else-if="attachment.type === 'video' || attachment.type === 'gifv'"
        :attachment="attachment"
    />
    <AudioAttachment
        v-else-if="attachment.type === 'audio'"
        :attachment="attachment"
    />
    <FileAttachment v-else :attachment="attachment"/>
</template>

<script lang="ts" setup>
import type { Attachment } from "@versia/client/schemas";
import type { z } from "zod";
import AudioAttachment from "./attachments/audio.vue";
import FileAttachment from "./attachments/file.vue";
import ImageAttachment from "./attachments/image.vue";
import VideoAttachment from "./attachments/video.vue";

defineProps<{
    attachment: z.infer<typeof Attachment>;
}>();
</script>
