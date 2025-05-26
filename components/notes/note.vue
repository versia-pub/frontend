<template>
    <Card as="article" class="relative gap-4 items-stretch">
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
                :visibility="noteToUse.visibility"
                :created-at="new Date(noteToUse.created_at)"
                :small-layout="smallLayout"
                class="z-[1]"
            />
            <div
                v-if="topAvatarBar"
                :class="
                    cn(
                        'shrink-0 bg-border w-0.5 absolute top-0 h-7 left-[3rem]'
                    )
                "
            ></div>
            <div
                v-if="bottomAvatarBar"
                :class="
                    cn(
                        'shrink-0 bg-border w-0.5 absolute bottom-0 h-[calc(100%-1.5rem)] left-[3rem]'
                    )
                "
            ></div>
        </CardHeader>
        <!-- Simply offset by the size of avatar + 0.75rem (the gap) -->
        <CardContent
            :class="
                ['space-y-4', contentUnderUsername && (smallLayout ? 'ml-11' : 'ml-[4.25rem]')]
            "
        >
            <Content
                :content="noteToUse.content"
                :quote="note.quote ?? undefined"
                :attachments="noteToUse.media_attachments"
                :plain-content="noteToUse.text ?? undefined"
                :emojis="noteToUse.emojis"
                :sensitive="noteToUse.sensitive"
                :content-warning="noteToUse.spoiler_text"
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
import { cn } from "@/lib/utils";
import type { Status } from "@versia/client/schemas";
import type { z } from "zod";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Actions from "./actions.vue";
import Content from "./content.vue";
import Header from "./header.vue";
import ReblogHeader from "./reblog-header.vue";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

const { note } = defineProps<{
    note: PartialBy<z.infer<typeof Status>, "reblog" | "quote">;
    hideActions?: boolean;
    smallLayout?: boolean;
    contentUnderUsername?: boolean;
    topAvatarBar?: boolean;
    bottomAvatarBar?: boolean;
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
