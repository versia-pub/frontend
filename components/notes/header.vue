<template>
    <div class="rounded flex flex-row items-center gap-3">
        <NuxtLink :href="url" :class="cn('relative size-14', smallLayout && 'size-6')">
            <Avatar :class="cn('size-14 rounded-md border border-card', smallLayout && 'size-6')">
                <AvatarImage :src="avatar" alt="" />
                <AvatarFallback class="rounded-lg"> AA </AvatarFallback>
            </Avatar>
            <Avatar v-if="cornerAvatar" class="size-6 rounded border absolute -bottom-1 -right-1">
                <AvatarImage :src="cornerAvatar" alt="" />
                <AvatarFallback class="rounded-lg"> AA </AvatarFallback>
            </Avatar>
        </NuxtLink>
        <div :class="cn('flex flex-col gap-0.5 justify-center flex-1 text-left leading-tight', smallLayout && 'flex-row justify-start items-center gap-2')">
            <span class="truncate font-semibold">{{
                displayName
                }}</span>
            <span class="truncate text-sm tracking-tight">
                <CopyableText :text="acct">
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
            <span class="text-xs text-muted-foreground" :title="visibilities[visibility].text">
                <component :is="visibilities[visibility].icon" class="size-5" />
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { StatusVisibility } from "@versia/client/types";
import { AtSign, Globe, Lock, LockOpen } from "lucide-vue-next";
import CopyableText from "./copyable-text.vue";

const { acct, createdAt } = defineProps<{
    avatar: string;
    cornerAvatar?: string;
    acct: string;
    displayName: string;
    visibility: StatusVisibility;
    url: string;
    createdAt: Date;
    smallLayout?: boolean;
}>();

const [username, instance] = acct.split("@");
const timeAgo = useTimeAgo(createdAt);
const fullTime = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
}).format(createdAt);

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