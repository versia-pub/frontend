<template>
    <div :class="['prose prose-sm block relative dark:prose-invert duration-200 !max-w-full break-words prose-a:no-underline prose-a:hover:underline', $style.content]" v-html="content" v-render-emojis="emojis">
    </div>
</template>

<script lang="ts" setup>
import type { CustomEmoji } from "@versia/client/schemas";
import type { z } from "zod";

const { content } = defineProps<{
    content: string;
    emojis: z.infer<typeof CustomEmoji>[];
}>();
</script>

<style module>
@import url("~/styles/content.css");
</style>
