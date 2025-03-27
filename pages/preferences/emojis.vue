<template>
    <div class="md:px-8 px-4 py-2 max-w-7xl mx-auto w-full space-y-6">
        <div :class="cn('grid gap-2', canUpload && 'grid-cols-[1fr,auto]')">
            <h1
                class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl capitalize"
            >
                {{ m.suave_smart_mantis_climb() }}
            </h1>
            <Uploader v-if="canUpload">
                <Button variant="default"> <Upload /> Upload </Button>
            </Uploader>
        </div>
        <div v-if="emojis.length > 0" class="max-w-sm w-full relative">
            <Input v-model="search" placeholder="Search" class="pl-8" />
            <Search
                class="absolute size-4 top-1/2 left-2.5 transform -translate-y-1/2"
            />
        </div>
        <Category
            v-if="emojis.length > 0"
            v-for="[name, emojis] in categories"
            :key="name"
            :emojis="emojis"
            :name="name"
        />
        <Card v-else class="shadow-none bg-transparent border-none p-4">
            <CardHeader class="text-center gap-y-4">
                <CardTitle>{{ m.actual_steep_llama_rest() }}</CardTitle>
                <CardDescription>
                    {{ m.lucky_suave_myna_adore() }}
                </CardDescription>
            </CardHeader>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { type Emoji, RolePermission } from "@versia/client/types";
import { Search, Upload } from "lucide-vue-next";
import Category from "~/components/preferences/emojis/category.vue";
import Uploader from "~/components/preferences/emojis/uploader.vue";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import * as m from "~/paraglide/messages.js";

useHead({
    title: m.mild_many_dolphin_mend(),
});

definePageMeta({
    layout: "app",
    breadcrumbs: () => [
        {
            text: m.broad_whole_herring_reside(),
        },
    ],
    requiresAuth: true,
});

const permissions = usePermissions();
const canUpload = computed(
    () =>
        permissions.value.includes(RolePermission.ManageOwnEmojis) ||
        permissions.value.includes(RolePermission.ManageEmojis)
);

const emojis = computed(
    () =>
        identity.value?.emojis?.filter((emoji) =>
            emoji.shortcode.toLowerCase().includes(search.value.toLowerCase())
        ) ?? []
);

const search = ref("");

/**
 * Sort emojis by category
 */
const categories = computed(() => {
    const categories = new Map<string, Emoji[]>();
    for (const emoji of emojis.value) {
        if (!emoji.category) {
            if (!categories.has(m.lucky_ago_rat_pinch())) {
                categories.set(m.lucky_ago_rat_pinch(), []);
            }

            categories.get(m.lucky_ago_rat_pinch())?.push(emoji);
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
