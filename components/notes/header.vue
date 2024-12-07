<template>
    <div class="rounded flex flex-row items-center gap-3">
        <HoverCard v-model:open="popupOpen" @update:open="() => {
            if (!enableHoverCard.value) {
                popupOpen = false;
            }
        }" :open-delay="2000">
            <HoverCardTrigger :as-child="true">
                <NuxtLink :href="urlAsPath" :class="cn('relative size-14', smallLayout && 'size-8')">
                    <Avatar :class="cn('size-14 border border-card', smallLayout && 'size-8')" :src="author.avatar"
                        :name="author.display_name" />
                    <Avatar v-if="cornerAvatar" class="size-6 border absolute -bottom-1 -right-1" :src="cornerAvatar" />
                </NuxtLink>
            </HoverCardTrigger>
            <HoverCardContent class="w-96">
                <SmallCard :account="author" />
            </HoverCardContent>
        </HoverCard>
        <div
            :class="cn('flex flex-col gap-0.5 justify-center flex-1 text-left leading-tight', smallLayout && 'text-sm')">
            <span class="truncate font-semibold" v-render-emojis="author.emojis">{{
                author.display_name
            }}</span>
            <span class="truncate text-sm tracking-tight">
                <CopyableText :text="author.acct">
                    <span
                        class="font-semibold bg-gradient-to-tr from-pink-700 dark:from-indigo-400 via-purple-700 dark:via-purple-400 to-indigo-700 dark:to-indigo-400 text-transparent bg-clip-text">
                        @{{ username }}
                    </span>
                    <span class="text-muted-foreground">{{ instance && "@" }}{{ instance }}</span>
                </CopyableText>
                &middot;
                <span class="text-muted-foreground ml-auto tracking-normal" :title="fullTime">{{ timeAgo }}</span>
            </span>
        </div>
        <div class="flex flex-col gap-1 justify-center items-end" v-if="!smallLayout">
            <NuxtLink :href="noteUrlAsPath" class="text-xs text-muted-foreground"
                :title="visibilities[visibility].text">
                <component :is="visibilities[visibility].icon" class="size-5" />
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { Account, StatusVisibility } from "@versia/client/types";
import type {
    UseTimeAgoMessages,
    UseTimeAgoUnitNamesDefault,
} from "@vueuse/core";
import { AtSign, Globe, Lock, LockOpen } from "lucide-vue-next";
import { languageTag } from "~/paraglide/runtime";
import { SettingIds } from "~/settings";
import Avatar from "../profiles/avatar.vue";
import SmallCard from "../profiles/small-card.vue";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card";
import CopyableText from "./copyable-text.vue";

const { createdAt, noteUrl, author, authorUrl } = defineProps<{
    cornerAvatar?: string;
    visibility: StatusVisibility;
    noteUrl: string;
    createdAt: Date;
    smallLayout?: boolean;
    author: Account;
    authorUrl: string;
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
const fullTime = new Intl.DateTimeFormat(languageTag(), {
    dateStyle: "medium",
    timeStyle: "short",
}).format(createdAt);
const enableHoverCard = useSetting(SettingIds.PopupAvatarHover);
const popupOpen = ref(false);

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