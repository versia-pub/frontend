<template>
    <div v-if="small" class="flex flex-row">
        <Skeleton :enabled="!note" shape="rect" class="!h-6 w-6">
            <NuxtLink :href="accountUrl">
                <img class="h-6 w-6 rounded ring-1 ring-white/5 shrink-0" :src="note?.account.avatar"
                    :alt="`${note?.account.acct}'s avatar`" />
            </NuxtLink>
        </Skeleton>
        <div class="flex flex-col items-start justify-around ml-4 grow overflow-hidden">
            <div class="flex flex-row text-sm items-center justify-between w-full">
                <NuxtLink :href="accountUrl" class="font-semibold text-gray-200 line-clamp-1 break-all">
                    <Skeleton :enabled="!note" :min-width="90" :max-width="170" shape="rect">
                        {{
        note?.account.display_name }}
                    </Skeleton>
                </NuxtLink>
                <NuxtLink :href="noteUrl" class="text-gray-400 ml-2 line-clamp-1 break-all shrink-0">
                    <Skeleton :enabled="!note" :min-width="50" :max-width="100" shape="rect">
                        {{ timeAgo }}
                    </Skeleton>
                </NuxtLink>
            </div>
        </div>
    </div>
    <div v-else class="flex flex-row">
        <Skeleton :enabled="!note" shape="rect" class="!h-12 w-12">
            <NuxtLink :href="accountUrl">
                <img class="h-12 w-12 rounded ring-1 ring-white/5" :src="note?.account.avatar"
                    :alt="`${note?.account.acct}'s avatar`" />
            </NuxtLink>
        </Skeleton>
        <div class="flex flex-col items-start justify-around ml-4 grow overflow-hidden">
            <div class="flex flex-row items-center justify-between w-full">
                <NuxtLink :href="accountUrl" class="font-semibold text-gray-200 line-clamp-1 break-all">
                    <Skeleton :enabled="!note" :min-width="90" :max-width="170" shape="rect">
                        {{
        note?.account.display_name }}
                    </Skeleton>
                </NuxtLink>
                <NuxtLink :href="noteUrl" class="text-gray-400 text-sm ml-2 line-clamp-1 break-all shrink-0">
                    <Skeleton :enabled="!note" :min-width="50" :max-width="100" shape="rect">
                        {{ timeAgo }}
                    </Skeleton>
                </NuxtLink>
            </div>
            <span class="text-gray-400 text-sm line-clamp-1 break-all w-full">
                <Skeleton :enabled="!note" :min-width="130" :max-width="250" shape="rect">
                    @{{
                    note?.account.acct
                    }}
                </Skeleton>
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Status } from "~/types/mastodon/status";

const props = defineProps<{
    note?: Status;
    small?: boolean;
}>();

const noteUrl = props.note && `/@${props.note.account.acct}/${props.note.id}`;
const accountUrl = props.note && `/@${props.note.account.acct}`;
const timeAgo = useTimeAgo(props.note?.created_at ?? 0);
</script>