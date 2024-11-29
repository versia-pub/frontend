<template>
    <div class="max-w-7xl mx-auto py-12 px-4">
        <div class="md:max-w-sm w-full relative mb-4">
            <TextInput v-model="search" placeholder="Search" class="pl-8" />
            <iconify-icon icon="tabler:search"
                class="absolute size-4 top-1/2 left-2.5 transform -translate-y-1/2 text-gray-200" aria-hidden="true"
                width="unset" />
        </div>
        <Category v-if="emojis.length > 0" v-for="([name, emojis]) in categories" :key="name" :emojis="emojis"
            :name="name" />
        <div v-else class="flex flex-col items-center justify-center gap-2 text-gray-200 text-center p-10">
            <span class="text-lg font-semibold">No emojis found.</span>
            <span class="text-sm">
                You can ask your administrator to add some emojis.
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Emoji } from "@versia/client/types";
import TextInput from "~/components/inputs/text-input.vue";
import Category from "./category.vue";

const emojis = computed(() =>
    ((identity.value?.emojis as Emoji[] | undefined) ?? []).filter((emoji) =>
        emoji.shortcode.toLowerCase().includes(search.value.toLowerCase()),
    ),
);
const search = ref("");

const categories = computed(() => {
    const categories = new Map<string, Emoji[]>();
    for (const emoji of emojis.value) {
        if (!emoji.category) {
            if (!categories.has("Uncategorized")) {
                categories.set("Uncategorized", []);
            }

            categories.get("Uncategorized")?.push(emoji);
            continue;
        }

        if (!categories.has(emoji.category)) {
            categories.set(emoji.category, []);
        }

        categories.get(emoji.category)?.push(emoji);
    }
    return categories;
});
</script>