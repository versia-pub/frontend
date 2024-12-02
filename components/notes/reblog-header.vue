<template>
    <NuxtLink :href="urlAsPath" class="rounded border hover:bg-muted duration-100 text-sm flex flex-row items-center gap-2 px-2 py-1 mb-4">
        <Repeat class="size-4 text-primary" />
        <Avatar shape="square" class="size-6 border">
            <AvatarImage :src="avatar" alt="" />
            <AvatarFallback class="rounded-lg"> AA </AvatarFallback>
        </Avatar>
        <span class="font-semibold" v-render-emojis="emojis">{{ displayName }}</span>
        reblogged
    </NuxtLink>
</template>

<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Emoji } from "@versia/client/types";
import { Repeat } from "lucide-vue-next";

const { url } = defineProps<{
    avatar: string;
    displayName: string;
    emojis: Emoji[];
    url: string;
}>();

const urlAsPath = new URL(url).pathname;
</script>