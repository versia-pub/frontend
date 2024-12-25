<template>
    <div :class="['prose prose-sm block relative dark:prose-invert duration-200 !max-w-full break-words prose-a:no-underline prose-a:hover:underline', $style.content]" v-html="content" v-render-emojis="emojis">
    </div>
</template>

<script lang="ts" setup>
import type { Emoji } from "@versia/client/types";

const { content } = defineProps<{
    content: string;
    emojis: Emoji[];
}>();
</script>

<style module>
@import url("~/styles/content.css");
</style>
