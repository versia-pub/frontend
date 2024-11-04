<template>
    <article
        class="first:rounded-t last:rounded-b ring-1 relative ring-white/5 p-6 flex flex-col bg-dark-800 hover:bg-dark-700 duration-200">
        <!-- Overlay that blocks clicks for disabled notes -->
        <div v-if="disabled" class="absolute z-10 inset-0 hover:cursor-not-allowed">
        </div>
        <div v-if="reblog" class="mb-4 flex flex-row gap-2 items-center text-primary-400">
            <Skeleton :enabled="!loaded" shape="rect" class="!h-6" :min-width="40" :max-width="100" width-unit="%">
                <iconify-icon width="1.5rem" height="1.5rem" icon="tabler:repeat" class="size-6" aria-hidden="true" />
                <Avatar v-if="reblog.avatar" :src="reblog.avatar" :alt="`${reblog.acct}'s avatar'`"
                    class="size-6 rounded shrink-0 ring-1 ring-white/10" />
                <span><strong v-html="reblogDisplayName"></strong> reblogged</span>
            </Skeleton>
        </div>
        <ReplyHeader v-if="isReply" :account_id="outputtedNote?.in_reply_to_account_id ?? null" />
        <Header :note="outputtedNote" :small="small" />
        <NoteContent :note="outputtedNote" :loaded="loaded" :url="url" :content="content" :is-quote="isQuote"
            :should-hide="shouldHide" />
        <Skeleton class="!h-10 w-full mt-6" :enabled="!props.element || !loaded" v-if="!small || !showInteractions">
            <InteractionRow v-if="showInteractions && outputtedNote" :note="outputtedNote" :url="url" :remove="remove" />
        </Skeleton>
    </article>
</template>

<script lang="ts" setup>
import type { Status } from "@versia/client/types";
import Avatar from "~/components/avatars/avatar.vue";
import Skeleton from "~/components/skeleton/Skeleton.vue";
import Header from "./header.vue";
import InteractionRow from "./interactions/row.vue";
import NoteContent from "./note-content.vue";
import ReplyHeader from "./reply-header.vue";

const props = withDefaults(
    defineProps<{
        element?: Status;
        small?: boolean;
        disabled?: boolean;
        showInteractions?: boolean;
    }>(),
    {
        showInteractions: true,
    },
);

const noteRef = ref(props.element);

useListen("composer:send-edit", (note) => {
    if (note.id === noteRef.value?.id) {
        noteRef.value = note;
    }
});

const {
    loaded,
    note: outputtedNote,
    remove,
    content,
    shouldHide,
    url,
    isQuote,
    reblog,
    isReply,
    reblogDisplayName,
} = useNoteData(noteRef, client, settings);
</script>