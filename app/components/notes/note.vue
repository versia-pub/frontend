<template>
    <Card
        as="article"
        :class="['relative gap-1.5 items-stretch bg-background', replyBar && 'pl-6']"
    >
        <div
            v-if="replyBar"
            class="absolute left-0 top-0 bottom-0 w-2 bg-border rounded-tl-md"
        />
        <CardHeader as="header" class="space-y-2">
            <ReblogHeader
                v-if="note.reblog"
                :avatar="note.account.avatar"
                :display-name="note.account.display_name"
                :url="reblogAccountUrl"
                :emojis="note.account.emojis"
            />
            <Header
                :author="noteToUse.account"
                :author-url="accountUrl"
                :corner-avatar="note.reblog ? note.account.avatar : undefined"
                :note-url="url"
                :is-remote="isRemote"
                :remote-url="noteToUse.url ?? undefined"
                :api-note-string="JSON.stringify(noteToUse, null, 4)"
                :visibility="noteToUse.visibility"
                :created-at="new Date(noteToUse.created_at)"
                @edit="useEvent('composer:edit', noteToUse)"
                @delete="useEvent('note:delete', noteToUse)"
                :note-id="noteToUse.id"
                class="z-1"
            />
        </CardHeader>
        <CardContent class="space-y-2">
            <Content
                :content="noteToUse.content"
                :quote="note.quote ?? undefined"
                :attachments="noteToUse.media_attachments"
                :plain-content="noteToUse.text ?? undefined"
                :emojis="noteToUse.emojis"
                :sensitive="noteToUse.sensitive"
                :content-warning="noteToUse.spoiler_text"
            />
            <Reactions
                v-if="noteToUse.reactions && noteToUse.reactions.length > 0"
                :reactions="noteToUse.reactions"
                :emojis="noteToUse.emojis"
                :status-id="noteToUse.id"
            />
        </CardContent>
        <CardFooter v-if="!hideActions">
            <Actions
                :reply-count="noteToUse.replies_count"
                :like-count="noteToUse.favourites_count"
                :url="url"
                :api-note-string="JSON.stringify(noteToUse, null, 4)"
                :reblog-count="noteToUse.reblogs_count"
                :remote-url="noteToUse.url ?? undefined"
                :is-remote="isRemote"
                :author-id="noteToUse.account.id"
                @edit="useEvent('composer:edit', noteToUse)"
                @reply="useEvent('composer:reply', noteToUse)"
                @quote="useEvent('composer:quote', noteToUse)"
                @delete="useEvent('note:delete', noteToUse)"
                :note-id="noteToUse.id"
                :liked="noteToUse.favourited ?? false"
                :reblogged="noteToUse.reblogged ?? false"
            />
        </CardFooter>
    </Card>
</template>

<script setup lang="ts">
import type { Status } from "@versia/client/schemas";
import type { z } from "zod";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Actions from "./actions.vue";
import Content from "./content.vue";
import Header from "./header.vue";
import Reactions from "./reactions/index.vue";
import ReblogHeader from "./reblog-header.vue";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

const {
    note,
    hideActions,
    replyBar = false,
} = defineProps<{
    note: PartialBy<z.infer<typeof Status>, "reblog" | "quote">;
    hideActions?: boolean;
    replyBar?: boolean;
}>();

// Notes can be reblogs, in which case the actual thing to render is inside the reblog property
const noteToUse = computed(() =>
    note.reblog
        ? (note.reblog as z.infer<typeof Status>)
        : (note as z.infer<typeof Status>),
);

const url = wrapUrl(`/@${noteToUse.value.account.acct}/${noteToUse.value.id}`);
const accountUrl = wrapUrl(`/@${noteToUse.value.account.acct}`);
const reblogAccountUrl = wrapUrl(`/@${note.account.acct}`);
const isRemote = noteToUse.value.account.acct.includes("@");
</script>
