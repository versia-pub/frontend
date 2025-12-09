<template>
    <div class="flex flex-row gap-2 flex-wrap">
        <Reaction
            v-for="reaction in reactions"
            :key="reaction.name"
            :reaction="reaction"
            :emoji="emojis.find(e => `:${e.shortcode}:` === reaction.name)"
            :status-id="statusId"
        />
    </div>
</template>

<script lang="ts" setup>
import type { CustomEmoji, NoteReaction } from "@versia/client/schemas";
import type { z } from "zod";
import Reaction from "./reaction.vue";

const { statusId, reactions, emojis } = defineProps<{
    statusId: string;
    reactions: z.infer<typeof NoteReaction>[];
    emojis: z.infer<typeof CustomEmoji>[];
}>();
</script>
