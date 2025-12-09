<template>
    <div class="flex items-start justify-between">
        <div class="flex items-center gap-3">
            <NuxtLink :href="urlAsPath">
                <Avatar :src="author.avatar" :name="author.display_name"/>
            </NuxtLink>
            <div class="flex flex-col gap-0.5">
                <div class="flex items-center gap-1">
                    <span
                        class="text-sm font-semibold"
                        v-render-emojis="author.emojis"
                        >{{ author.display_name }}</span
                    >
                </div>
                <div
                    class="flex items-center gap-1 text-muted-foreground text-xs"
                >
                    <span>
                        @{{ `${username}${instance ? `@${instance}` : ""}` }}
                    </span>
                    <span>&middot;</span>
                    <span>{{ timeAgo }}</span>
                </div>
            </div>
        </div>
        <Menu
            :api-note-string="apiNoteString"
            :url="noteUrl"
            :remote-url="remoteUrl"
            :is-remote="isRemote"
            :author-id="author.id"
            @edit="emit('edit')"
            :note-id="noteId"
            @delete="emit('delete')"
        >
            <Button variant="ghost" size="icon">
                <Ellipsis/>
            </Button>
        </Menu>
    </div>
</template>

<script lang="ts" setup>
import type { Account, Status } from "@versia/client/schemas";
import type {
    UseTimeAgoMessages,
    UseTimeAgoUnitNamesDefault,
} from "@vueuse/core";
import { AtSign, Ellipsis, Globe, Lock, LockOpen } from "lucide-vue-next";
import type { z } from "zod";
import { getLocale } from "~~/paraglide/runtime";
import Avatar from "../profiles/avatar.vue";
import { Button } from "../ui/button";
import Menu from "./menu.vue";

const { createdAt, noteUrl, author, authorUrl } = defineProps<{
    cornerAvatar?: string;
    visibility: z.infer<typeof Status.shape.visibility>;
    noteUrl: string;
    createdAt: Date;
    author: z.infer<typeof Account>;
    authorUrl: string;
    remoteUrl?: string;
    apiNoteString: string;
    isRemote: boolean;
    noteId: string;
}>();

const [username, instance] = author.acct.split("@");
const digitRegex = /\d/;
const urlAsPath = new URL(authorUrl).pathname;
const noteUrlAsPath = new URL(noteUrl).pathname;
const timeAgo = useTimeAgo(createdAt, {
    messages: {
        justNow: "now",
        past: (n) => (n.match(digitRegex) ? `${n}` : n),
        future: (n) => (n.match(digitRegex) ? `in ${n}` : n),
        month: (n) => `${n}mo`,
        year: (n) => `${n}y`,
        day: (n) => `${n}d`,
        week: (n) => `${n}w`,
        hour: (n) => `${n}h`,
        minute: (n) => `${n}m`,
        second: (n) => `${n}s`,
        invalid: "",
    } as UseTimeAgoMessages<UseTimeAgoUnitNamesDefault>,
});
const fullTime = new Intl.DateTimeFormat(getLocale(), {
    dateStyle: "medium",
    timeStyle: "short",
}).format(createdAt);
const popupOpen = ref(false);

const emit = defineEmits<{
    edit: [];
    delete: [];
}>();

const visibilities = {
    public: {
        icon: Globe,
        text: "This note is public: it can be seen by anyone.",
    },
    unlisted: {
        icon: LockOpen,
        text: "This note is unlisted: it can be seen by anyone with the link.",
    },
    private: {
        icon: Lock,
        text: "This note is private: it can only be seen by followers.",
    },
    direct: {
        icon: AtSign,
        text: "This note is direct: it can only be seen by mentioned users.",
    },
};
</script>
