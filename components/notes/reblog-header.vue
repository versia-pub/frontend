<template>
    <NuxtLink :href="urlAsPath">
        <Card class="flex-row px-2 py-1 items-center gap-2 hover:bg-muted duration-100 text-sm">
            <Repeat class="size-4 text-primary" />
            <Avatar class="size-6 border" :src="avatar" :name="displayName" />
            <span class="font-semibold" v-render-emojis="emojis">{{ displayName }}</span>
            {{ m.large_vivid_horse_catch() }}
        </Card>
    </NuxtLink>
</template>

<script lang="ts" setup>
import type { Emoji } from "@versia/client/types";
import { Repeat } from "lucide-vue-next";
import * as m from "~/paraglide/messages.js";
import Avatar from "../profiles/avatar.vue";
import { Card } from "../ui/card";

const { url } = defineProps<{
    avatar: string;
    displayName: string;
    emojis: Emoji[];
    url: string;
}>();

const urlAsPath = new URL(url).pathname;
</script>
