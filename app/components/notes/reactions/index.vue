<template>
    <div class="flex flex-row gap-1 flex-wrap">
        <Reaction
            v-for="reaction in note.reactions"
            :key="reaction.name"
            :reaction="reaction"
            :emoji="note.emojis.find(e => `:${e.shortcode}:` === reaction.name)"
        />
    </div>
</template>

<script lang="ts" setup>
import { key } from "../provider";
import Reaction from "./reaction.vue";

// biome-ignore lint/style/noNonNullAssertion: We want an error if not provided
const { note } = inject(key)!;
</script>
