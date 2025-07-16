<template>
    <div class="p-2 text-sm font-semibold border-0 rounded-none text-center flex flex-row items-center gap-2 truncate">
        <img v-if="(emoji as InferredEmoji)?.url" :src="(emoji as InferredEmoji)?.url"
            :alt="(emoji as InferredEmoji)?.shortcode" class="h-8 align-middle inline not-prose" />
        <span v-else-if="(emoji as UnicodeEmoji)?.unicode" class="text-2xl align-middle inline not-prose">
            {{ (emoji as UnicodeEmoji)?.unicode }}
        </span>
        {{ (emoji as InferredEmoji)?.shortcode || (emoji as UnicodeEmoji)?.shortcode }}
    </div>
</template>

<script lang="ts" setup>
import type { CustomEmoji } from "@versia/client/schemas";
import type { z } from "zod";
import type { UnicodeEmoji } from "./emoji.ts";

type InferredEmoji = z.infer<typeof CustomEmoji>;
const { emoji } = defineProps<{
    emoji: z.infer<typeof CustomEmoji> | UnicodeEmoji | null;
}>();
</script>
