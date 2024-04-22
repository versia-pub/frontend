<template>
    <div
        class="first:rounded-t last:rounded-b ring-1 ring-white/5 p-6 flex flex-col bg-dark-800 hover:bg-dark-700 duration-200">
        <div class="flex flex-row">
            <Skeleton :enabled="isLoading" shape="rect" class="!h-12 w-12">
                <NuxtLink :href="accountUrl">
                    <img class="h-12 w-12 rounded ring-1 ring-white/5" :src="note?.account.avatar" alt="" />
                </NuxtLink>
            </Skeleton>
            <div class="flex flex-col items-start justify-around ml-4 grow overflow-hidden">
                <div class="flex flex-row items-center justify-between w-full">
                    <NuxtLink :href="accountUrl" class="font-semibold text-gray-200 line-clamp-1 break-all">
                        <Skeleton :enabled="isLoading" :min-width="90" :max-width="170" shape="rect">
                            {{
                note?.account.display_name }}
                        </Skeleton>
                    </NuxtLink>
                    <NuxtLink :href="noteUrl" class="text-gray-400 text-sm ml-2 line-clamp-1 break-all shrink-0">
                        <Skeleton :enabled="isLoading" :min-width="50" :max-width="100" shape="rect">
                            {{ timeAgo }}
                        </Skeleton>
                    </NuxtLink>
                </div>
                <span class="text-gray-400 text-sm line-clamp-1 break-all w-full">
                    <Skeleton :enabled="isLoading" :min-width="130" :max-width="250" shape="rect">
                        @{{
                note?.account.acct
            }}
                    </Skeleton>
                </span>
            </div>
        </div>
        <NuxtLink :href="noteUrl" class="mt-6">
            <Skeleton :enabled="true" v-if="isLoading" :min-width="50" :max-width="100" width-unit="%" shape="rect"
                type="content">
            </Skeleton>
            <div v-else-if="content" class="prose prose-invert prose-a:no-underline" v-html="content">
            </div>
            <div v-if="attachments.length > 0" class="[&:not(:first-child)]:mt-6">
                <SocialElementsNotesAttachment v-for="attachment of attachments" :key="attachment.id"
                    :attachment="attachment" />
            </div>
        </NuxtLink>
        <Skeleton class="!h-10 w-full mt-6" :enabled="true" v-if="isLoading"></Skeleton>
        <div v-else
            class="mt-6 flex flex-row items-stretch justify-between text-sm h-10 hover:[&>button]:bg-dark-800 [&>button]:duration-200 [&>button]:rounded [&>button]:flex [&>button]:flex-1 [&>button]:flex-row [&>button]:items-center [&>button]:justify-center">
            <button>
                <Icon name="tabler:arrow-back-up" class="h-5 w-5 text-gray-200" aria-hidden="true" />
                <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(note?.replies_count) }}</span>
            </button>
            <button>
                <Icon name="tabler:heart" class="h-5 w-5 text-gray-200" aria-hidden="true" />
                <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(note?.favourites_count) }}</span>
            </button>
            <button>
                <Icon name="tabler:repeat" class="h-5 w-5 text-gray-200" aria-hidden="true" />
                <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(note?.reblogs_count) }}</span>
            </button>
            <button>
                <Icon name="tabler:quote" class="h-5 w-5 text-gray-200" aria-hidden="true" />
                <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(0) }}</span>
            </button>
            <button>
                <Icon name="tabler:dots" class="h-5 w-5 text-gray-200" aria-hidden="true" />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Skeleton from "~/components/skeleton/Skeleton.vue";
import type { Status } from "~/types/mastodon/status";

const props = defineProps<{
    note?: Status;
    skeleton?: boolean;
}>();

const isLoading = props.skeleton;
const timeAgo = useTimeAgo(props.note?.created_at ?? 0);

const client = await useMegalodon();
const mentions = await useResolveMentions(props.note?.mentions ?? [], client);
const content = props.note ? await useParsedContent(props.note.content, props.note.emojis, mentions.value) : "";
const numberFormat = (number = 0) => new Intl.NumberFormat(undefined, {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
}).format(number);
const attachments = props.note?.media_attachments ?? [];
const noteUrl = props.note && `/@${props.note.account.acct}/${props.note.id}`;
const accountUrl = props.note && `/@${props.note.account.acct}`;
</script>