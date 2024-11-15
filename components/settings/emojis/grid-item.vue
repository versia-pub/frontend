<template>
    <div class="rounded ring-1 m-1 ring-white/10 grid grid-cols-[auto,1fr] gap-x-4 p-3 bg-dark-400 hover:ring-2 hover:ring-primary-600 duration-100 items-center">
        <Avatar :src="emoji.url" class="size-12 rounded bg-transparent" />
        <div class="text-ellipsis font-mono text-wrap w-full overflow-hidden">{{ emoji.shortcode }}</div>
        <!-- <GridItemMenu :emoji="emoji" /> -->
    </div>
</template>

<script lang="ts" setup>
import type { Emoji } from "@versia/client/types";
import Avatar from "~/components/avatars/avatar.vue";
import GridItemMenu from "./grid-item-menu.vue";

defineProps<{
    emoji: Emoji & { id: string; global: boolean };
}>();
</script>