<template>
    <ContentWarning
        v-if="(note.sensitive || note.spoiler_text) && preferences.show_content_warning"
        v-model="hidden"
    />

    <OverflowGuard
        v-if="note.content"
        :character-count="characterCount"
        :class="(hidden && preferences.show_content_warning) && 'hidden'"
    >
        <Prose v-html="note.content" v-render-emojis="note.emojis"></Prose>
    </OverflowGuard>

    <Attachments
        v-if="note.media_attachments.length > 0"
        :attachments="note.media_attachments"
        :class="(hidden && preferences.show_content_warning) && 'hidden'"
    />

    <div v-if="note.quote" class="mt-4 rounded border overflow-hidden">
        <Note :note="note.quote" :hide-actions="true" :small-layout="true" />
    </div>
</template>

<script lang="ts" setup>
import Attachments from "./attachments.vue";
import ContentWarning from "./content-warning.vue";
import Note from "./note.vue";
import OverflowGuard from "./overflow-guard.vue";
import Prose from "./prose.vue";
import { key } from "./provider";

// biome-ignore lint/style/noNonNullAssertion: We want an error if not provided
const { note } = inject(key)!;

const hidden = ref(note.sensitive || !!note.spoiler_text);

const characterCount = note.text?.length;
</script>
