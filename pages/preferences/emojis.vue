<template>
    <div class="md:px-8 px-4 py-2 max-w-7xl mx-auto w-full space-y-6">
        <h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl capitalize">
            Emojis
        </h1>
        <div v-if="emojis.length > 0" class="max-w-sm w-full relative">
            <Input v-model="search" placeholder="Search" class="pl-8" />
            <Search class="absolute size-4 top-1/2 left-2.5 transform -translate-y-1/2" />
        </div>
        <Category v-if="emojis.length > 0" v-for="([name, emojis]) in categories" :key="name" :emojis="emojis"
            :name="name" />
        <Card v-else class="shadow-none bg-transparent border-none p-4">
            <CardHeader class="text-center gap-y-4">
                <CardTitle class="text-">No emojis found.</CardTitle>
                <CardDescription>
                    Ask your administrator to add some emojis.
                </CardDescription>
            </CardHeader>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import type { Emoji } from "@versia/client/types";
import { Search } from "lucide-vue-next";
import Category from "~/components/preferences/emojis/category.vue";
import { Input } from "~/components/ui/input";

definePageMeta({
    layout: "app",
    breadcrumbs: [
        {
            text: "Preferences",
        },
    ],
    requiresAuth: true,
});

const emojis = computed(
    () =>
        identity.value?.emojis?.filter((emoji) =>
            emoji.shortcode.toLowerCase().includes(search.value.toLowerCase()),
        ) ?? [],
);

const search = ref("");

/**
 * Sort emojis by category
 */
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