<template>
    <AutocompleteSuggestbox :currently-typing="currentlyTypingMention" :textarea="textarea" :suggestions="mentions"
        :distance-function="distance">
        <template #default="{ suggestion }">
            <Avatar :src="(suggestion.value as Account).avatar" class="w-full h-full rounded"
                :alt="`User ${(suggestion.value as Account).acct}`" />
        </template>
    </AutocompleteSuggestbox>
</template>

<script lang="ts" setup>
import type { Account } from "@lysand-org/client/types";
import { distance } from "fastest-levenshtein";
import Avatar from "../avatars/avatar.vue";
import AutocompleteSuggestbox from "./autocomplete-suggestbox.vue";
const props = defineProps<{
    currentlyTypingMention: string | null;
    textarea: HTMLTextAreaElement | undefined;
}>();

const mentions = ref<{ key: string; value: Account }[]>([]);

watch(
    () => props.currentlyTypingMention,
    async (value) => {
        if (!value) {
            return;
        }

        const users = await client.value.searchAccount(value, { limit: 20 });
        mentions.value = users.data
            .map((user) => ({
                key: user.username,
                value: user,
                distance: distance(value, user.username),
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 20);
    },
);
</script>