<template>
    <div
        class="first:rounded-t last:rounded-b ring-1 relative ring-white/5 p-6 flex flex-col bg-dark-800 hover:bg-dark-700 duration-200">
        <!-- Overlay that blocks clicks for disabled notes -->
        <div v-if="disabled" class="absolute z-10 inset-0 hover:cursor-not-allowed">
        </div>
        <div v-if="reblog" class="mb-4 flex flex-row gap-2 items-center text-pink-500">
            <Skeleton :enabled="!loaded" shape="rect" class="!h-6" :min-width="40" :max-width="100" width-unit="%">
                <Icon name="tabler:repeat" class="h-6 w-6" aria-hidden="true" />
                <img v-if="reblog.avatar" :src="reblog.avatar" :alt="`${reblog.acct}'s avatar'`"
                    class="h-6 w-6 rounded ring-1 ring-white/10" />
                <span><strong v-html="reblogDisplayName"></strong> reblogged</span>
            </Skeleton>
        </div>
        <SocialElementsNotesHeader :note="note" :small="small" />
        <div v-if="!collapsed">
            <NuxtLink :href="url" class="mt-6 block relative">
                <Skeleton :enabled="!props.note || !loaded" :min-width="50" :max-width="100" width-unit="%" shape="rect"
                    type="content">
                    <div v-if="content"
                        :class="['prose prose-invert duration-200 !max-w-full break-words prose-a:no-underline content']"
                        v-html="content">
                    </div>
                </Skeleton>
            </NuxtLink>
            <div v-if="note && note.media_attachments.length > 0" class="[&:not(:first-child)]:mt-6">
                <SocialElementsNotesAttachment v-for="attachment of note.media_attachments" :key="attachment.id"
                    :attachment="attachment" />
            </div>
            <div v-if="isQuote && note?.reblog" class="mt-4">
                <SocialElementsNotesNote :note="note?.reblog" :small="true" />
            </div>
        </div>
        <div v-else
            class="rounded text-center ring-1 !max-w-full ring-white/10 h-52 mt-6 prose prose-invert p-4 flex flex-col justify-center items-center">
            <strong v-if="note?.sensitive" class="max-w-64">This note was tagged as containing sensitive
                content</strong>
            <!-- Spoiler text is it's specified -->
            <span v-if="note?.spoiler_text" class="mt-2 break-all">{{ note.spoiler_text
                }}</span>
            <ButtonsSecondary @click="collapsed = false" class="mt-4">Show content</ButtonsSecondary>
        </div>
        <Skeleton class="!h-10 w-full mt-6" :enabled="!props.note || !loaded" v-if="!small || !showInteractions">
            <div v-if="showInteractions"
                class="mt-6 flex flex-row items-stretch disabled:*:opacity-70 disabled:*:cursor-not-allowed relative justify-between text-sm h-10 hover:enabled:[&>button]:bg-dark-800 [&>button]:duration-200 [&>button]:rounded [&>button]:flex [&>button]:flex-1 [&>button]:flex-row [&>button]:items-center [&>button]:justify-center">
                <button class="group" @click="note && useEvent('note:reply', note)" :disabled="!isSignedIn">
                    <Icon name="tabler:arrow-back-up"
                        class="h-5 w-5 text-gray-200 group-hover:group-enabled:text-blue-600" aria-hidden="true" />
                    <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(note?.replies_count) }}</span>
                </button>
                <button class="group" :disabled="!isSignedIn">
                    <Icon name="tabler:heart" v-if="!note?.favourited"
                        class="h-5 w-5 text-gray-200 group-hover:group-enabled:text-pink-600" aria-hidden="true" />
                    <Icon name="tabler:heart-filled" v-else
                        class="h-5 w-5 text-pink-600 group-hover:group-enabled:text-gray-200" aria-hidden="true" />
                    <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(note?.favourites_count) }}</span>
                </button>
                <button class="group" :disabled="!isSignedIn">
                    <Icon name="tabler:repeat" v-if="!note?.reblogged"
                        class="h-5 w-5 text-gray-200 group-hover:group-enabled:text-green-600" aria-hidden="true" />
                    <Icon name="tabler:repeat-off" v-else
                        class="h-5 w-5 text-green-600 group-hover:group-enabled:text-gray-200" aria-hidden="true" />
                    <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(note?.reblogs_count) }}</span>
                </button>
                <button class="group" @click="note && useEvent('note:quote', note)" :disabled="!isSignedIn">
                    <Icon name="tabler:quote" class="h-5 w-5 text-gray-200 group-hover:group-enabled:text-blue-600"
                        aria-hidden="true" />
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
                            <ButtonsDropdownElement @click="copy(url)" icon="tabler:link" class="w-full">
                                Copy Link
                            </ButtonsDropdownElement>
                        </HeadlessMenuItem>
                        <HeadlessMenuItem>
                            <ButtonsDropdownElement @click="remove" icon="tabler:backspace" :disabled="!isSignedIn"
                                class="w-full border-r-2 border-red-500">
                                Delete
                            </ButtonsDropdownElement>
                        </HeadlessMenuItem>
                    </template>
                </DropdownsAdaptiveDropdown>
            </div>
        </Skeleton>
    </div>
</template>

<script lang="ts" setup>
import Skeleton from "~/components/skeleton/Skeleton.vue";
import type { Status } from "~/types/mastodon/status";

const props = withDefaults(
    defineProps<{
        note?: Status;
        small?: boolean;
        disabled?: boolean;
        showInteractions?: boolean;
    }>(),
    {
        showInteractions: true,
    },
);

const tokenData = useTokenData();
const isSignedIn = useSignedIn();
const client = useMegalodon(tokenData);
const {
    loaded,
    note,
    remove,
    content,
    shouldHide,
    url,
    isQuote,
    reblog,
    reblogDisplayName,
} = useNoteData(ref(props.note), client);

const collapsed = ref(shouldHide.value);

const { copy } = useClipboard();
const numberFormat = (number = 0) =>
    new Intl.NumberFormat(undefined, {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
    }).format(number);
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