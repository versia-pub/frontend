<template>
    <Button @focus="() => emit('select', emoji)" @mouseenter="() => emit('select', emoji)" @click="() => emit('pick', emoji)" size="icon" variant="ghost"
        class="size-12">
        <img v-if="(emoji as InferredEmoji).url" :src="(emoji as InferredEmoji).url"
            :alt="(emoji as InferredEmoji).shortcode" class="h-8 align-middle inline not-prose" />
        <span v-else-if="(emoji as UnicodeEmoji).unicode" class="text-2xl align-middle inline not-prose">
            {{ (emoji as UnicodeEmoji).unicode }}
        </span>
    </Button>
</template>

<script lang="ts" setup>
import type { CustomEmoji } from "@versia/client/schemas";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import type { UnicodeEmoji } from "./emoji";

const { emoji } = defineProps<{
    emoji: z.infer<typeof CustomEmoji> | UnicodeEmoji;
}>();
type InferredEmoji = z.infer<typeof CustomEmoji>;

const emit = defineEmits<{
    select: [emoji: z.infer<typeof CustomEmoji> | UnicodeEmoji];
    pick: [emoji: z.infer<typeof CustomEmoji> | UnicodeEmoji];
}>();
</script>
