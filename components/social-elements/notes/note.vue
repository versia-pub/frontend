<template>
    <div
        class="first:rounded-t last:rounded-b ring-1 ring-white/5 p-6 flex flex-col bg-dark-800 hover:bg-dark-700 duration-200">
        <div v-if="props.note?.reblog" class="mb-4 flex flex-row gap-2 items-center text-pink-500">
            <Skeleton :enabled="!props.note" shape="rect" class="!h-6" :min-width="40" :max-width="100" width-unit="%">
                <Icon name="tabler:repeat" class="h-6 w-6" aria-hidden="true" />
                <img v-if="props.note?.account.avatar" :src="props.note?.account.avatar"
                    :alt="`${props.note?.account.acct}'s avatar'`" class="h-6 w-6 rounded ring-1 ring-white/10" />
                <span><strong v-html="eventualReblogAccountName"></strong> reblogged</span>
            </Skeleton>
        </div>
        <SocialElementsNotesHeader :note="note" :small="small" />
        <div v-if="!noteClosed">
            <NuxtLink :href="noteUrl" class="mt-6 block relative">
                <Skeleton :enabled="true" v-if="!note" :min-width="50" :max-width="100" width-unit="%" shape="rect"
                    type="content">
                </Skeleton>
                <div v-else-if="content"
                    :class="['prose prose-invert duration-200 !max-w-full break-words prose-a:no-underline content']"
                    v-html="content">
                </div>
            </NuxtLink>
            <div v-if="attachments.length > 0" class="[&:not(:first-child)]:mt-6">
                <SocialElementsNotesAttachment v-for="attachment of attachments" :key="attachment.id"
                    :attachment="attachment" />
            </div>
        </div>
        <div v-else
            class="rounded text-center ring-1 !max-w-full ring-white/10 h-52 mt-6 prose prose-invert p-4 flex flex-col justify-center items-center">
            <strong v-if="note?.sensitive" class="max-w-64">This note was tagged as containing sensitive
                content</strong>
            <!-- Spoiler text is it's specified -->
            <span v-if="note?.spoiler_text" class="mt-2 break-all">{{ note.spoiler_text
                }}</span>
            <ButtonsSecondary @click="noteClosed = false" class="mt-4">Show content</ButtonsSecondary>
        </div>
        <Skeleton class="!h-10 w-full mt-6" :enabled="true" v-if="!note && !small"></Skeleton>
        <div v-else-if="!small"
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
    small?: boolean;
}>();

// Handle reblogs
const note = computed(() => props.note?.reblog ?? props.note);
const noteClosed = ref(note.value?.sensitive || !!note.value?.spoiler_text || false);

const { copy } = useClipboard();
const client = useMegalodon();
const mentions = await useResolveMentions(note.value?.mentions ?? [], client);
const eventualReblogAccountName = props.note?.reblog ? (useParsedContent(props.note?.account.display_name, props.note?.account.emojis, mentions.value)).value : null;
const content =
    note.value && process.client
        ? useParsedContent(
            note.value.content,
            note.value.emojis,
            mentions.value,
        )
        : "";
const numberFormat = (number = 0) =>
    new Intl.NumberFormat(undefined, {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
    }).format(number);
const attachments = note.value?.media_attachments ?? [];
const noteUrl = note.value && `/@${note.value.account.acct}/${note.value.id}`;
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