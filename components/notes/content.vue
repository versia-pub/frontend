<template>
    <div ref="container" :class="['overflow-y-hidden relative duration-200']" :style="{
        maxHeight: collapsed ? '18rem' : `${container?.scrollHeight}px`
    }">
        <div :class="['prose prose-sm block relative dark:prose-invert duration-200 !max-w-full break-words prose-a:no-underline prose-a:hover:underline', $style.content]"
            v-html="content" v-render-emojis="emojis">
        </div>
        <div v-if="isOverflowing && collapsed"
            class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/5 to-transparent rounded-b">
        </div>
        <Button v-if="isOverflowing" @click="collapsed = !collapsed"
            class="absolute bottom-2 right-1/2 translate-x-1/2">{{
                collapsed ? `Show more${plainContent ? ` • ${formattedCharacterCount
                    } characters` : ""
                    }` : "Show less"
            }}</Button>
    </div>

    <Attachments v-if="attachments.length > 0" :attachments="attachments" />

    <div v-if="quote" class="mt-4 rounded border overflow-hidden">
        <Note :note="quote" :hide-actions="true" :small-layout="true" />
    </div>
</template>

<script lang="ts" setup>
import type { Attachment, Emoji, Status } from "@versia/client/types";
import { Button } from "~/components/ui/button";
import Attachments from "./attachments.vue";
import Note from "./note.vue";

const { content, plainContent } = defineProps<{
    plainContent?: string;
    content: string;
    quote?: NonNullable<Status["quote"]>;
    emojis: Emoji[];
    attachments: Attachment[];
}>();
const container = ref<HTMLDivElement | null>(null);
const collapsed = ref(true);

// max-h-72 is 18rem
const remToPx = (rem: number) =>
    rem *
    Number.parseFloat(
        getComputedStyle(document.documentElement).fontSize || "16px",
    );
const isOverflowing = computed(() => {
    if (!container.value) {
        return false;
    }
    return container.value.scrollHeight > remToPx(18);
});

const characterCount = plainContent?.length;
const formattedCharacterCount = characterCount
    ? new Intl.NumberFormat("en-us").format(characterCount)
    : undefined;
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
    border-radius: .25rem;
    margin-bottom: 0.2rem;
    margin-right: .5rem;
    margin-top: 0;
    vertical-align: middle;
    --tw-text-opacity: 1;
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