<template>
    <NuxtLink :href="urlAsPath" class="rounded border hover:bg-muted duration-100 text-sm flex flex-row items-center gap-2 px-2 py-1 mb-4">
        <Repeat class="size-4 text-primary" />
        <Avatar class="size-6 border" :src="avatar" :name="displayName" />
        <span class="font-semibold" v-render-emojis="emojis">{{ displayName }}</span>
        {{ m.large_vivid_horse_catch() }}
    </NuxtLink>
</template>

<script lang="ts" setup>
import type { Emoji } from "@versia/client/types";
import { Repeat } from "lucide-vue-next";
import * as m from "~/paraglide/messages.js";
import Avatar from "../profiles/avatar.vue";

const { url } = defineProps<{
    avatar: string;
    displayName: string;
    emojis: Emoji[];
    url: string;
}>();

const urlAsPath = new URL(url).pathname;
</script>