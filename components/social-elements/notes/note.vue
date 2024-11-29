<template>
    <article
        :class="['relative flex flex-col', borders && 'first:rounded-t last:rounded-b ring-1 ring-white/5', background && 'bg-dark-800 hover:bg-dark-700 duration-200']">
        <note v-if="renderReplies && isReply && reply && !threadView" :thread-view="true" :element="reply"
            :borders="false" :render-replies="false" :thread-view-top="false" />
        <div class="relative">
            <div v-if="threadView && outputtedNote"
                class="h-[calc(100%-2rem)] w-[0.1rem] rounded bg-gray-600 absolute top-[4.5rem] left-12">
            </div>
            <div v-if="threadViewTop && reply && outputtedNote"
                class="h-[1.5rem] w-[0.1rem] rounded bg-gray-600 absolute top-0 left-12">
            </div>

            <div :class="[padding && 'p-6', 'z-10']">
                <!-- Overlay that blocks clicks for disabled notes -->
                <div v-if="disabled" class="absolute z-10 inset-0 hover:cursor-not-allowed">
                </div>
                <div v-if="reblog" class="mb-4 flex flex-row gap-2 items-center text-primary2-400">
                    <Skeleton :enabled="!loaded" shape="rect" class="!h-6" :min-width="40" :max-width="100"
                        width-unit="%">
                        <iconify-icon width="1.5rem" height="1.5rem" icon="tabler:repeat" class="size-6"
                            aria-hidden="true" />
                        <Avatar v-if="reblog.avatar" :src="reblog.avatar" :alt="`${reblog.acct}'s avatar'`"
                            class="size-6 rounded shrink-0 ring-1 ring-white/10" />
                        <span><strong v-html="reblogDisplayName"></strong> reblogged</span>
                    </Skeleton>
                </div>
                <!-- <ReplyHeader v-if="isReply && !threadView" :account_id="outputtedNote?.in_reply_to_account_id ?? null" /> -->
                <Header :note="outputtedNote" :small="small" />
                <NoteContent :class="threadView && 'ml-16'" :note="outputtedNote" :loaded="loaded" :url="url"
                    :content="content" :is-quote="isQuote" :should-hide="shouldHide" />
                <Skeleton class="!h-10 w-full mt-6" :enabled="!props.element || !loaded"
                    v-if="!small || !showInteractions">
                    <InteractionRow v-if="showInteractions && outputtedNote && !threadView" :note="outputtedNote"
                        :url="url" :remove="remove" />
                </Skeleton>
            </div>
        </div>
    </article>
</template>

<script lang="ts" setup>
import type { Status } from "@versia/client/types";
import Avatar from "~/components/avatars/avatar.vue";
import Skeleton from "~/components/skeleton/Skeleton.vue";
import Header from "./header.vue";
import InteractionRow from "./interactions/row.vue";
import NoteContent from "./note-content.vue";

const props = withDefaults(
    defineProps<{
        element?: MaybeRef<Status>;
        small?: boolean;
        disabled?: boolean;
        showInteractions?: boolean;
        threadView?: boolean;
        threadViewTop?: boolean;
        renderReplies?: boolean;
        padding?: boolean;
        borders?: boolean;
        background?: boolean;
    }>(),
    {
        showInteractions: true,
        padding: true,
        borders: true,
        renderReplies: true,
        background: true,
        threadViewTop: true,
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

const inReplyToId = computed(
    () => outputtedNote?.value?.in_reply_to_id ?? null,
);
const reply = useNote(client, inReplyToId);
</script>