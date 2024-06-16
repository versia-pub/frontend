<template>
    <article
        class="first:rounded-t last:rounded-b ring-1 relative ring-white/5 p-6 flex flex-col bg-dark-800 hover:bg-dark-700 duration-200">
        <!-- Overlay that blocks clicks for disabled notes -->
        <div v-if="disabled" class="absolute z-10 inset-0 hover:cursor-not-allowed">
        </div>
        <div v-if="reblog" class="mb-4 flex flex-row gap-2 items-center text-primary-400">
            <Skeleton :enabled="!loaded" shape="rect" class="!h-6" :min-width="40" :max-width="100" width-unit="%">
                <iconify-icon width="1.5rem" height="1.5rem" icon="tabler:repeat" class="size-6" aria-hidden="true" />
                <AvatarsCentered v-if="reblog.avatar" :src="reblog.avatar" :alt="`${reblog.acct}'s avatar'`"
                    class="size-6 rounded shrink-0 ring-1 ring-white/10" />
                <span><strong v-html="reblogDisplayName"></strong> reblogged</span>
            </Skeleton>
        </div>
        <SocialElementsNotesReplyHeader v-if="isReply" :account_id="outputtedNote?.in_reply_to_account_id ?? null" />
        <SocialElementsNotesHeader :note="outputtedNote" :small="small" />
        <LazySocialElementsNotesNoteContent :note="outputtedNote" :loaded="loaded" :url="url" :content="content"
            :is-quote="isQuote" :should-hide="shouldHide" />
        <Skeleton class="!h-10 w-full mt-6" :enabled="!props.note || !loaded" v-if="!small || !showInteractions">
            <div v-if="showInteractions"
                class="mt-6 flex flex-row items-stretch disabled:*:opacity-70 [&>button]:max-w-28 disabled:*:cursor-not-allowed relative justify-around text-sm h-10 hover:enabled:[&>button]:bg-dark-800 [&>button]:duration-200 [&>button]:rounded [&>button]:flex [&>button]:flex-1 [&>button]:flex-row [&>button]:items-center [&>button]:justify-center">
                <button class="group" @click="outputtedNote && useEvent('note:reply', outputtedNote)"
                    :disabled="!identity">
                    <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:arrow-back-up"
                        class="text-gray-200 group-hover:group-enabled:text-blue-600" aria-hidden="true" />
                    <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(outputtedNote?.replies_count) }}</span>
                </button>
                <button class="group" @click="likeFn" :disabled="!identity">
                    <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:heart" v-if="!outputtedNote?.favourited"
                        class="size-5 text-gray-200 group-hover:group-enabled:text-primary-600" aria-hidden="true" />
                    <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:heart-filled" v-else
                        class="size-5 text-primary-600 group-hover:group-enabled:text-gray-200" aria-hidden="true" />
                    <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(outputtedNote?.favourites_count) }}</span>
                </button>
                <button class="group" @click="reblogFn" :disabled="!identity">
                    <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:repeat" v-if="!outputtedNote?.reblogged"
                        class="size-5 text-gray-200 group-hover:group-enabled:text-green-600" aria-hidden="true" />
                    <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:repeat" v-else
                        class="size-5 text-green-600 group-hover:group-enabled:text-gray-200" aria-hidden="true" />
                    <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(outputtedNote?.reblogs_count) }}</span>
                </button>
                <button class="group" @click="outputtedNote && useEvent('note:quote', outputtedNote)"
                    :disabled="!identity">
                    <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:quote"
                        class="size-5 text-gray-200 group-hover:group-enabled:text-blue-600" aria-hidden="true" />
                    <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(0) }}</span>
                </button>
                <DropdownsAdaptiveDropdown>
                    <template #button>
                        <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:dots" class="size-5 text-gray-200"
                            aria-hidden="true" />
                        <span class="sr-only">Open menu</span>
                    </template>

                    <template #items>
                        <Menu.ItemGroup>
                            <Menu.Item value="" v-if="isMyAccount">
                                <ButtonsDropdownElement @click="outputtedNote && useEvent('note:edit', outputtedNote)"
                                    icon="tabler:pencil" class="w-full">
                                    Edit
                                </ButtonsDropdownElement>
                            </Menu.Item>
                            <Menu.Item value="">
                                <ButtonsDropdownElement @click="copy(JSON.stringify(props.note, null, 4))"
                                    icon="tabler:code" class="w-full">
                                    Copy API
                                    Response
                                </ButtonsDropdownElement>
                            </Menu.Item>
                            <Menu.Item value="">
                                <ButtonsDropdownElement @click="copy(url)" icon="tabler:link" class="w-full">
                                    Copy Link
                                </ButtonsDropdownElement>
                            </Menu.Item>
                            <Menu.Item value="" v-if="outputtedNote?.url && isRemote">
                                <ButtonsDropdownElement @click="copy(outputtedNote.url)" icon="tabler:link"
                                    class="w-full">
                                    Copy Link (Origin)
                                </ButtonsDropdownElement>
                            </Menu.Item>
                            <Menu.Item value="" v-if="outputtedNote?.url && isRemote">
                                <ButtonsDropdownElement @click="openBlank(outputtedNote.url)"
                                    icon="tabler:external-link" class="w-full">
                                    View on Remote
                                </ButtonsDropdownElement>
                            </Menu.Item>
                            <Menu.Item value="" v-if="isMyAccount">
                                <ButtonsDropdownElement @click="remove" icon="tabler:backspace" :disabled="!identity"
                                    class="w-full border-r-2 border-red-500">
                                    Delete
                                </ButtonsDropdownElement>
                            </Menu.Item>
                        </Menu.ItemGroup>
                        <hr class="border-white/10 rounded" v-if="identity" />
                        <Menu.ItemGroup v-if="identity">
                            <Menu.Item value="">
                                <ButtonsDropdownElement @click="outputtedNote && useEvent('note:reply', outputtedNote)"
                                    icon="tabler:arrow-back-up" class="w-full">
                                    Reply
                                </ButtonsDropdownElement>
                            </Menu.Item>
                            <Menu.Item value="">
                                <ButtonsDropdownElement @click="likeFn" icon="tabler:heart" class="w-full"
                                    v-if="!outputtedNote?.favourited">
                                    Like
                                </ButtonsDropdownElement>
                                <ButtonsDropdownElement @click="likeFn" icon="tabler:heart-filled" class="w-full"
                                    v-else>
                                    Unlike
                                </ButtonsDropdownElement>
                            </Menu.Item>
                            <Menu.Item value="">
                                <ButtonsDropdownElement @click="reblogFn" icon="tabler:repeat" class="w-full"
                                    v-if="!outputtedNote?.reblogged">
                                    Reblog
                                </ButtonsDropdownElement>
                                <ButtonsDropdownElement @click="reblogFn" icon="tabler:repeat" class="w-full" v-else>
                                    Unreblog
                                </ButtonsDropdownElement>
                            </Menu.Item>
                            <Menu.Item value="">
                                <ButtonsDropdownElement @click="outputtedNote && useEvent('note:quote', outputtedNote)"
                                    icon="tabler:quote" class="w-full">
                                    Quote
                                </ButtonsDropdownElement>
                            </Menu.Item>
                        </Menu.ItemGroup>
                        <hr class="border-white/10 rounded" v-if="identity" />
                        <Menu.ItemGroup v-if="identity">
                            <Menu.Item value="">
                                <ButtonsDropdownElement @click="outputtedNote && useEvent('note:report', outputtedNote)"
                                    icon="tabler:flag" class="w-full"
                                    :disabled="!permissions.includes(RolePermissions.MANAGE_OWN_REPORTS)">
                                    Report
                                </ButtonsDropdownElement>
                            </Menu.Item>
                            <Menu.Item value="" v-if="permissions.includes(RolePermissions.MANAGE_ACCOUNTS)">
                                <ButtonsDropdownElement icon="tabler:shield-bolt" class="w-full">
                                    Open Moderation Panel
                                </ButtonsDropdownElement>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </template>
                </DropdownsAdaptiveDropdown>
            </div>
        </Skeleton>
    </article>
</template>

<script lang="ts" setup>
import { Menu } from "@ark-ui/vue";
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

const noteRef = ref(props.note);

useListen("composer:send-edit", (note) => {
    if (note.id === noteRef.value?.id) {
        noteRef.value = note;
    }
});

const client = useClient();
const identity = useCurrentIdentity();
const {
    loaded,
    note: outputtedNote,
    remove,
    content,
    shouldHide,
    url,
    isQuote,
    reblog,
    isReply,
    reblogDisplayName,
} = useNoteData(noteRef, client);

const openBlank = (url: string) => window.open(url, "_blank");

const { copy } = useClipboard();
const isMyAccount = computed(
    () => identity.value?.account.id === outputtedNote.value?.account.id,
);
const isRemote = computed(() =>
    outputtedNote.value?.account.acct.includes("@"),
);
const permissions = usePermissions();
const numberFormat = (number = 0) =>
    new Intl.NumberFormat(undefined, {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
    }).format(number);

const likeFn = async () => {
    if (!outputtedNote.value) return;
    if (outputtedNote.value.favourited) {
        const output = await client.value.unfavouriteStatus(
            outputtedNote.value.id,
        );

        if (output?.data) {
            noteRef.value = output.data;
        }
    } else {
        const output = await client.value.favouriteStatus(
            outputtedNote.value.id,
        );

        if (output?.data) {
            noteRef.value = output.data;
        }
    }
};

const reblogFn = async () => {
    if (!outputtedNote.value) return;
    if (outputtedNote.value?.reblogged) {
        const output = await client.value.unreblogStatus(
            outputtedNote.value.id,
        );

        if (output?.data) {
            noteRef.value = output.data;
        }
    } else {
        const output = await client.value.reblogStatus(outputtedNote.value.id);

        if (output?.data.reblog) {
            noteRef.value = output.data.reblog;
        }
    }
};
</script>