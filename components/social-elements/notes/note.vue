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
                    class="h-6 w-6 rounded shrink-0 ring-1 ring-white/10" />
                <span><strong v-html="reblogDisplayName"></strong> reblogged</span>
            </Skeleton>
        </div>
        <SocialElementsNotesHeader :note="note" :small="small" />
        <SocialElementsNotesNoteContent :note="note" :loaded="loaded" :url="url" :content="content" :is-quote="isQuote"
            :should-hide="shouldHide" />
        <Skeleton class="!h-10 w-full mt-6" :enabled="!props.note || !loaded" v-if="!small || !showInteractions">
            <div v-if="showInteractions"
                class="mt-6 flex flex-row items-stretch disabled:*:opacity-70 [&>button]:max-w-28 disabled:*:cursor-not-allowed relative justify-around text-sm h-10 hover:enabled:[&>button]:bg-dark-800 [&>button]:duration-200 [&>button]:rounded [&>button]:flex [&>button]:flex-1 [&>button]:flex-row [&>button]:items-center [&>button]:justify-center">
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

const { copy } = useClipboard();
const numberFormat = (number = 0) =>
    new Intl.NumberFormat(undefined, {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
    }).format(number);
</script>