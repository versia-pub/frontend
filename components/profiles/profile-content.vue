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
.content pre:has(code) {
    word-wrap: normal;
    background: transparent;
    background-color: #ffffff0d;
    border-radius: .25rem;
    hyphens: none;
    margin-top: 1rem;
    overflow-x: auto;
    padding: .75rem 1rem;
    tab-size: 4;
    white-space: pre;
    word-break: normal;
    word-spacing: normal;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), 0 0 #0000;
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    --tw-ring-color: hsla(0, 0%, 100%, .1)
}

.content pre code {
    display: block;
    padding: 0
}

.content code:not(pre code)::after,
.content code:not(pre code)::before {
    content: ""
}

.content ol li input[type=checkbox],
.content ul li input[type=checkbox] {
  border-radius:.25rem;
  margin-bottom:0.2rem;
  margin-right:.5rem;
  margin-top:0;
  vertical-align: middle;
  --tw-text-opacity:1;
  color: var(--theme-primary-400);
}

.content code:not(pre code) {
    border-radius: .25rem;
    padding: .25rem .5rem;
    word-wrap: break-word;
    background: transparent;
    background-color: #ffffff0d;
    hyphens: none;
    margin-top: 1rem;
    tab-size: 4;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), 0 0 #0000;
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    --tw-ring-color: hsla(0, 0%, 100%, .1)
}
</style>