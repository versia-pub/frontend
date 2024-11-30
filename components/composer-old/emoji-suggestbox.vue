<template>
    <AutocompleteSuggestbox :currently-typing="currentlyTypingEmoji" :textarea="textarea" :suggestions="emojis"
        :distance-function="distance">
        <template #default="{ suggestion }">
            <Avatar :src="(suggestion.value as Emoji).url"
                class="w-full h-full [&>img]:object-contain !bg-transparent rounded"
                :alt="`Emoji with shortcode ${(suggestion.value as Emoji).shortcode}`" />
        </template>
    </AutocompleteSuggestbox>
</template>

<script lang="ts" setup>
import type { Emoji } from "@versia/client/types";
import { distance } from "fastest-levenshtein";
import Avatar from "../avatars/avatar.vue";
import AutocompleteSuggestbox from "./autocomplete-suggestbox.vue";
defineProps<{
    currentlyTypingEmoji: string | null;
    textarea: HTMLTextAreaElement | undefined;
}>();

const emojis = computed(
    () =>
        identity.value?.emojis.map((emoji) => ({
            key: emoji.shortcode,
            value: emoji,
        })) ?? [],
);
</script>