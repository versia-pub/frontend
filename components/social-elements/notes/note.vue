<template>
    <div
        class="first:rounded-t last:rounded-b ring-1 ring-white/5 p-6 flex flex-col bg-dark-800 hover:bg-dark-700 duration-200">
        <div class="flex flex-row">
            <Skeleton :enabled="isLoading" shape="rect" class="!h-12 w-12">
                <NuxtLink :href="accountUrl">
                    <img class="h-12 w-12 rounded ring-1 ring-white/5" :src="note?.account.avatar"
                        :alt="`${note?.account.acct}'s avatar`" />
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
            <div v-else-if="content" class="prose prose-invert prose-a:no-underline content" v-html="content">
            </div>
        </NuxtLink>
        <div v-if="attachments.length > 0" class="[&:not(:first-child)]:mt-6">
            <SocialElementsNotesAttachment v-for="attachment of attachments" :key="attachment.id"
                :attachment="attachment" />
        </div>
        <Skeleton class="!h-10 w-full mt-6" :enabled="true" v-if="isLoading"></Skeleton>
        <div v-else
            class="mt-6 flex flex-row items-stretch relative justify-between text-sm h-10 hover:[&>button]:bg-dark-800 [&>button]:duration-200 [&>button]:rounded [&>button]:flex [&>button]:flex-1 [&>button]:flex-row [&>button]:items-center [&>button]:justify-center">
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
            <DropdownsAdaptiveDropdown>
                <template #button>
                    <HeadlessMenuButton>
                        <Icon name="tabler:dots" class="h-5 w-5 text-gray-200" aria-hidden="true" />
                        <span class="sr-only">Open menu</span>
                    </HeadlessMenuButton>
                </template>

                <template #items>
                    <HeadlessMenuItem>
                        <ButtonsDropdownElement @click="copy(JSON.stringify(note, null, 4))" icon="tabler:code"
                            class="w-full">
                            Copy API
                            Response
                        </ButtonsDropdownElement>
                    </HeadlessMenuItem>
                    <HeadlessMenuItem>
                        <ButtonsDropdownElement @click="note && copy(note.uri)" icon="tabler:code" class="w-full">
                            Copy Link
                        </ButtonsDropdownElement>
                    </HeadlessMenuItem>
                </template>
            </DropdownsAdaptiveDropdown>
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

const { copy } = useClipboard();
const client = await useMegalodon();
const mentions = await useResolveMentions(props.note?.mentions ?? [], client);
const content =
    props.note && process.client
        ? await useParsedContent(
            props.note.content,
            props.note.emojis,
            mentions.value,
        )
        : "";
const numberFormat = (number = 0) =>
    new Intl.NumberFormat(undefined, {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
    }).format(number);
const attachments = props.note?.media_attachments ?? [];
const noteUrl = props.note && `/@${props.note.account.acct}/${props.note.id}`;
const accountUrl = props.note && `/@${props.note.account.acct}`;
</script>

<style>
.content pre:has(code) {
    word-wrap: normal;
    background: transparent;
    background-color: #ffffff0d;
    border-radius: .25rem;
    -webkit-hyphens: none;
    hyphens: none;
    margin-top: 1rem;
    overflow-x: auto;
    padding: .75rem 1rem;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    white-space: pre;
    word-break: normal;
    word-spacing: normal;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), 0 0 #0000;
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    --tw-ring-color: hsla(0, 0%, 100%, .1)
}

.content pre code {
    display: block;
    padding: 0
}
</style>