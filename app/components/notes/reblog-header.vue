<template>
    <NuxtLink :href="urlAsPath">
        <Card
            class="flex-row px-2 py-1 items-center gap-2 hover:bg-muted duration-100 text-sm"
        >
            <Repeat class="size-4 text-primary" />
            <Avatar
                class="size-6 border"
                :src="rebloggerNote.account.avatar"
                :name="rebloggerNote.account.display_name"
            />
            <span
                class="font-semibold"
                v-render-emojis="rebloggerNote.account.emojis"
                >{{ rebloggerNote.account.display_name }}</span
            >
            {{ m.large_vivid_horse_catch() }}
        </Card>
    </NuxtLink>
</template>

<script lang="ts" setup>
import { Repeat } from "lucide-vue-next";
import * as m from "~~/paraglide/messages.js";
import Avatar from "../profiles/avatar.vue";
import { Card } from "../ui/card";
import { key } from "./provider";

// biome-ignore lint/style/noNonNullAssertion: We want an error if not provided
const { rebloggerNote } = inject(key)!;

if (!rebloggerNote) {
    throw new Error(
        "ReblogHeader must be used with a rebloggerNote in context",
    );
}

const reblogAccountUrl = wrapUrl(`/@${rebloggerNote.account.acct}`);
const urlAsPath = new URL(reblogAccountUrl).pathname;
</script>
