<template>
    <ContentWarning v-if="(sensitive || contentWarning) && preferences.show_content_warning" :content-warning="contentWarning" v-model="blurred" />

    <OverflowGuard v-if="content" :character-count="characterCount" :class="(blurred && preferences.show_content_warning) && 'blur-md'">
        <Prose v-html="content" v-render-emojis="emojis"></Prose>
    </OverflowGuard>

    <Attachments v-if="attachments.length > 0" :attachments="attachments" :class="(blurred && preferences.show_content_warning) && 'blur-xl'" />

    <div v-if="quote" class="mt-4 rounded border overflow-hidden">
        <Note :note="quote" :hide-actions="true" :small-layout="true" />
    </div>
</template>

<script lang="ts" setup>
import type { Attachment, CustomEmoji, Status } from "@versia/client/schemas";
import type { z } from "zod";
import Attachments from "./attachments.vue";
import ContentWarning from "./content-warning.vue";
import Note from "./note.vue";
import OverflowGuard from "./overflow-guard.vue";
import Prose from "./prose.vue";

const { content, plainContent, sensitive, contentWarning } = defineProps<{
    plainContent?: string;
    content: string;
    quote?: NonNullable<z.infer<typeof Status.shape.quote>>;
    emojis: z.infer<typeof CustomEmoji>[];
    attachments: z.infer<typeof Attachment>[];
    sensitive: boolean;
    contentWarning?: string;
}>();

const blurred = ref(sensitive || !!contentWarning);

const characterCount = plainContent?.length;
</script>
