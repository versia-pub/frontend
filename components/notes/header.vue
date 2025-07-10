<template>
    <div class="rounded grid grid-cols-[auto_1fr_auto] items-center gap-3">
        <HoverCard v-model:open="popupOpen" @update:open="() => {
            if (!preferences.popup_avatar_hover) {
                popupOpen = false;
            }
        }" :open-delay="2000">
            <HoverCardTrigger :as-child="true">
                <NuxtLink :href="urlAsPath" :class="cn('relative size-12', smallLayout && 'size-8')">
                    <Avatar :class="cn('size-12 border border-card', smallLayout && 'size-8')" :src="author.avatar"
                        :name="author.display_name" />
                    <Avatar v-if="cornerAvatar" class="size-6 border absolute -bottom-1 -right-1" :src="cornerAvatar" />
                </NuxtLink>
            </HoverCardTrigger>
            <HoverCardContent class="w-96">
                <SmallCard :account="author" />
            </HoverCardContent>
        </HoverCard>
        <Col
            :class="smallLayout && 'text-sm'">
            <Text class="font-semibold" v-render-emojis="author.emojis">{{
                author.display_name
            }}</Text>
            <div class="-mt-1">
                <Address as="span" :username="username" :domain="instance" />
                &middot;
                <Text as="span" muted class="ml-auto tracking-normal" :title="fullTime">{{ timeAgo }}</Text>
            </div>
        </Col>
        <div v-if="!smallLayout">
            <NuxtLink :href="noteUrlAsPath" class="text-xs text-muted-foreground"
                :title="visibilities[visibility].text">
                <component :is="visibilities[visibility].icon" class="size-4" />
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Account, Status } from "@versia/client/schemas";
import type {
    UseTimeAgoMessages,
    UseTimeAgoUnitNamesDefault,
} from "@vueuse/core";
import { AtSign, Globe, Lock, LockOpen } from "lucide-vue-next";
import type { z } from "zod";
import { cn } from "@/lib/utils";
import { getLocale } from "~/paraglide/runtime";
import Address from "../profiles/address.vue";
import Avatar from "../profiles/avatar.vue";
import SmallCard from "../profiles/small-card.vue";
import Col from "../typography/layout/col.vue";
import Row from "../typography/layout/row.vue";
import Text from "../typography/text.vue";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card";

const { createdAt, noteUrl, author, authorUrl } = defineProps<{
    cornerAvatar?: string;
    visibility: z.infer<typeof Status.shape.visibility>;
    noteUrl: string;
    createdAt: Date;
    smallLayout?: boolean;
    author: z.infer<typeof Account>;
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
const fullTime = new Intl.DateTimeFormat(getLocale(), {
    dateStyle: "medium",
    timeStyle: "short",
}).format(createdAt);
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
