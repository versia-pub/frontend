<template>
    <div
        class="mt-6 flex flex-row items-stretch relative justify-around text-sm h-10">
        <InteractionButton @click="useEvent('note:reply', note)"
            :disabled="!identity">
            <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:arrow-back-up"
                class="text-gray-200 group-hover:group-enabled:text-blue-600" aria-hidden="true" />
            <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(note.replies_count) }}</span>
        </InteractionButton>
        <InteractionButton @click="likeFn" :disabled="!identity">
            <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:heart" v-if="!note.favourited"
                class="size-5 text-gray-200 group-hover:group-enabled:text-primary-600" aria-hidden="true" />
            <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:heart-filled" v-else
                class="size-5 text-primary-600 group-hover:group-enabled:text-gray-200" aria-hidden="true" />
            <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(note.favourites_count) }}</span>
        </InteractionButton>
        <InteractionButton @click="reblogFn" :disabled="!identity">
            <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:repeat" v-if="!note.reblogged"
                class="size-5 text-gray-200 group-hover:group-enabled:text-green-600" aria-hidden="true" />
            <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:repeat" v-else
                class="size-5 text-green-600 group-hover:group-enabled:text-gray-200" aria-hidden="true" />
            <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(note.reblogs_count) }}</span>
        </InteractionButton>
        <InteractionButton @click="useEvent('note:quote', note)"
            :disabled="!identity">
            <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:quote"
                class="size-5 text-gray-200 group-hover:group-enabled:text-blue-600" aria-hidden="true" />
            <span class="text-gray-400 mt-0.5 ml-2">{{ numberFormat(0) }}</span>
        </InteractionButton>
        <NoteMenu v-model:note="note" :url="url" :remove="remove" />
    </div>
</template>

<script lang="ts" setup>
import type { Status } from "@versia/client/types";
import NoteMenu from "../note-menu.vue";
import InteractionButton from "./button.vue";

defineProps<{
    url: string;
    remove: () => Promise<void>;
}>();

const note = defineModel<Status>("note", {
    required: true,
});

const numberFormat = (number = 0) =>
    new Intl.NumberFormat(undefined, {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
    }).format(number);

const likeFn = async () => {
    if (note.value.favourited) {
        const output = await client.value.unfavouriteStatus(note.value.id);

        if (output?.data) {
            note.value = output.data;
        }
    } else {
        const output = await client.value.favouriteStatus(note.value.id);

        if (output?.data) {
            note.value = output.data;
        }
    }
};

const reblogFn = async () => {
    if (note.value?.reblogged) {
        const output = await client.value.unreblogStatus(note.value.id);

        if (output?.data) {
            note.value = output.data;
        }
    } else {
        const output = await client.value.reblogStatus(note.value.id);

        if (output?.data.reblog) {
            note.value = output.data.reblog;
        }
    }
};
</script>