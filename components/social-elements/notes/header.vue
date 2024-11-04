<template>
    <div v-if="small" class="flex flex-row">
        <NuxtLink :href="accountUrl" class="shrink-0">
            <Avatar :src="note?.account.avatar" :alt="`${note?.account.acct}'s avatar`"
                class="size-6 rounded ring-1 ring-white/5" />
            <span class="sr-only">Account profile</span>
        </NuxtLink>
        <div class="flex flex-col items-start justify-around ml-4 grow overflow-hidden">
            <div class="flex flex-row text-sm items-center justify-between w-full">
                <NuxtLink :href="accountUrl" class="font-semibold text-gray-200 line-clamp-1 break-all">
                    <Skeleton :enabled="!note" :min-width="90" :max-width="170" shape="rect">
                        {{ note?.account.display_name }}
                    </Skeleton>
                </NuxtLink>
                <NuxtLink :href="noteUrl" class="text-gray-300 ml-2 line-clamp-1 break-all shrink-0">
                    <Skeleton :enabled="!note" :min-width="50" :max-width="100" shape="rect">
                        {{ timeAgo }}
                    </Skeleton>
                </NuxtLink>
            </div>
        </div>
    </div>
    <div v-else class="flex flex-row gap-x-4">
        <UserCard :account="note?.account">
            <NuxtLink :href="accountUrl" class="shrink-0">
                <Avatar :src="note?.account.avatar" :alt="`${note?.account.acct}'s avatar`"
                    class="h-12 w-12 rounded ring-1 ring-white/5" />
                <span class="sr-only">Account profile</span>
            </NuxtLink>
        </UserCard>
        <div class="flex flex-col items-start justify-around grow overflow-hidden">
            <div class="flex flex-row items-center justify-between w-full">
                <NuxtLink :href="accountUrl" class="font-semibold text-gray-200 line-clamp-1 break-all">
                    <Skeleton :enabled="!note" :min-width="90" :max-width="170" shape="rect">
                        {{ note?.account.display_name }}
                    </Skeleton>
                </NuxtLink>
                <NuxtLink v-if="note" :href="noteUrl" class="text-gray-300 text-sm ml-2 line-clamp-1 break-all shrink-0"
                    :title="visibilities[note.visibility].text">
                    <iconify-icon :icon="visibilities[note.visibility].icon" width="1.25rem" height="1.25rem"
                        class="text-gray-400" aria-hidden="true" />
                    <span class="sr-only">{{ visibilities[note.visibility].text }}</span>
                </NuxtLink>
            </div>
            <div class="flex flex-row items-center justify-between w-full group">
                <span class="text-gray-300 text-sm line-clamp-1 break-all w-full">
                    <Skeleton :enabled="!note" :min-width="130" :max-width="250" shape="rect">
                        <div class="group-hover:hidden">
                            <span class="font-bold bg-gradient-to-tr from-primary-300 via-purple-300 to-indigo-400 text-transparent bg-clip-text">@{{ username }}</span><span class="text-gray-500">{{ instance && "@" }}{{ instance }}</span>
                            &middot; <span
                                class="text-gray-400 cursor-help ml-auto" :alt="fullTime"
                                :title="fullTime">
                                <Skeleton :enabled="!note" :min-width="10" :max-width="50" shape="rect">
                                    {{ timeAgo }}
                                </Skeleton>
                            </span >
                        </div>
                        <span @click="copyAccount" v-if="!hasCopied"
                            class="hidden select-none w-full group-hover:flex cursor-pointer items-center gap-x-1">
                            <iconify-icon icon="tabler:clipboard" height="1rem" width="1rem" class="text-gray-200"
                                aria-hidden="true" />
                            Click to copy
                        </span>
                        <span v-else class="hidden group-hover:flex select-none items-center gap-x-1">
                            <iconify-icon icon="tabler:check" height="1rem" width="1rem" class="text-green-500"
                                aria-hidden="true" />
                            Copied!
                        </span>
                    </Skeleton>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Status } from "@versia/client/types";
import Avatar from "~/components/avatars/avatar.vue";
import Skeleton from "~/components/skeleton/Skeleton.vue";
import UserCard from "~/components/social-elements/users/UserCard.vue";

const props = defineProps<{
    note?: Status;
    small?: boolean;
}>();

const username = props.note?.account.acct.split("@")[0];
const instance = props.note?.account.acct.split("@")[1];

const noteUrl = props.note && `/@${props.note.account.acct}/${props.note.id}`;
const accountUrl = props.note && `/@${props.note.account.acct}`;
const timeAgo = useTimeAgo(props.note?.created_at ?? 0, {});
const fullTime = Intl.DateTimeFormat("default", {
    dateStyle: "medium",
    timeStyle: "short",
}).format(new Date(props.note?.created_at ?? 0));
const hasCopied = ref(false);

const { copy } = useClipboard();
const copyAccount = () => {
    if (props.note) {
        copy(`@${props.note.account.acct}`);
        hasCopied.value = true;
        setTimeout(() => {
            hasCopied.value = false;
        }, 2000);
    }
};

const visibilities = {
    public: {
        icon: "tabler:world",
        text: "This note is public: it can be seen by anyone.",
    },
    unlisted: {
        icon: "tabler:lock-open",
        text: "This note is unlisted: it can be seen by anyone with the link.",
    },
    private: {
        icon: "tabler:lock",
        text: "This note is private: it can only be seen by followers.",
    },
    direct: {
        icon: "tabler:mail",
        text: "This note is direct: it can only be seen by mentioned users.",
    },
};
</script>