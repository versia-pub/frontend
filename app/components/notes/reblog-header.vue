<template>
    <NuxtLink :href="urlAsPath">
        <Card
            class="flex-row px-2 py-1 items-center gap-2 hover:bg-muted duration-100 text-sm"
        >
            <Repeat class="size-4 text-primary"/>
            <Avatar class="size-6 border" :src="avatar" :name="displayName"/>
            <span class="font-semibold" v-render-emojis="emojis"
                >{{ displayName }}</span
            >
            {{ m.large_vivid_horse_catch() }}
        </Card>
    </NuxtLink>
</template>

<script lang="ts" setup>
import type { CustomEmoji } from "@versia/client/schemas";
import { Repeat } from "lucide-vue-next";
import type { z } from "zod";
import * as m from "~~/paraglide/messages.js";
import Avatar from "../profiles/avatar.vue";
import { Card } from "../ui/card";

const { url } = defineProps<{
    avatar: string;
    displayName: string;
    emojis: z.infer<typeof CustomEmoji>[];
    url: string;
}>();

const urlAsPath = new URL(url).pathname;
</script>
