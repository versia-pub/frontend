<template>
    <div v-if="small" class="flex flex-row">
        <NuxtLink :href="accountUrl" class="shrink-0">
            <AvatarsCentered :src="note?.account.avatar" :alt="`${note?.account.acct}'s avatar`"
                class="size-6 rounded ring-1 ring-white/5" />
            <span class="sr-only">Account profile</span>
        </NuxtLink>
        <div class="flex flex-col items-start justify-around ml-4 grow overflow-hidden">
            <div class="flex flex-row text-sm items-center justify-between w-full">
                <NuxtLink :href="accountUrl" class="font-semibold text-gray-200 line-clamp-1 break-all">
                    <Skeleton :enabled="!note" :min-width="90" :max-width="170" shape="rect">
                        {{
                            note?.account.display_name }}
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
    <div v-else class="flex flex-row">
        <NuxtLink :href="accountUrl" class="shrink-0">
            <AvatarsCentered :src="note?.account.avatar" :alt="`${note?.account.acct}'s avatar`"
                class="h-12 w-12 rounded ring-1 ring-white/5" />
            <span class="sr-only">Account profile</span>
        </NuxtLink>
        <div class="flex flex-col items-start justify-around ml-4 grow overflow-hidden">
            <div class="flex flex-row items-center justify-between w-full">
                <NuxtLink :href="accountUrl" class="font-semibold text-gray-200 line-clamp-1 break-all">
                    <Skeleton :enabled="!note" :min-width="90" :max-width="170" shape="rect">
                        {{
                            note?.account.display_name }}
                    </Skeleton>
                </NuxtLink>
                <NuxtLink :href="noteUrl" class="text-gray-300 text-sm ml-2 line-clamp-1 break-all shrink-0"
                    :alt="fullTime" :title="fullTime">
                    <Skeleton :enabled="!note" :min-width="50" :max-width="100" shape="rect">
                        {{ timeAgo }}
                    </Skeleton>
                </NuxtLink>
            </div>
            <span class="text-gray-300 text-sm line-clamp-1 break-all w-full group">
                <Skeleton :enabled="!note" :min-width="130" :max-width="250" shape="rect">
                    <span class="group-hover:hidden">
                        @{{
                            note?.account.acct
                        }}</span>
                    <span @click="copyAccount" v-if="!hasCopied"
                        class="hidden select-none group-hover:flex cursor-pointer items-center gap-x-1">
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
</template>

<script lang="ts" setup>
import type { Status } from "@lysand-org/client/types";

const props = defineProps<{
    note?: Status;
    small?: boolean;
}>();

const noteUrl = props.note && `/@${props.note.account.acct}/${props.note.id}`;
const accountUrl = props.note && `/@${props.note.account.acct}`;
const timeAgo = useTimeAgo(props.note?.created_at ?? 0);
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
</script>