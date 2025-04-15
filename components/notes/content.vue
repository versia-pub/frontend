<template>
    <ContentWarning v-if="(sensitive || contentWarning) && showCw.value" :content-warning="contentWarning" v-model="blurred" />

    <OverflowGuard :character-count="characterCount" :class="(blurred && showCw.value) && 'blur-md'">
        <Prose v-html="content" v-render-emojis="emojis"></Prose>
    </OverflowGuard>

    <Attachments v-if="attachments.length > 0" :attachments="attachments" :class="(blurred && showCw.value) && 'blur-xl'" />

    <div v-if="quote" class="mt-4 rounded border overflow-hidden">
        <Note :note="quote" :hide-actions="true" :small-layout="true" />
    </div>
</template>

<script lang="ts" setup>
import type { Attachment, Emoji, Status } from "@versia/client/types";
import { type BooleanSetting, SettingIds } from "~/settings";
import Attachments from "./attachments.vue";
import ContentWarning from "./content-warning.vue";
import Note from "./note.vue";
import OverflowGuard from "./overflow-guard.vue";
import Prose from "./prose.vue";

const { content, plainContent, sensitive, contentWarning } = defineProps<{
    plainContent?: string;
    content: string;
    quote?: NonNullable<Status["quote"]>;
    emojis: Emoji[];
    attachments: Attachment[];
    sensitive: boolean;
    contentWarning?: string;
}>();

const blurred = ref(sensitive || !!contentWarning);
const showCw = useSetting(SettingIds.ShowContentWarning) as Ref<BooleanSetting>;

const characterCount = plainContent?.length;
</script>
