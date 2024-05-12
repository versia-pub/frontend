<template>
    <div v-if="!collapsed">
        <NuxtLink :href="url" class="mt-6 block relative" aria-label="Link to note">
            <Skeleton :enabled="!props.note || !loaded" :min-width="50" :max-width="100" width-unit="%" shape="rect"
                type="content">
                <div v-if="content"
                    :class="['prose prose-invert duration-200 !max-w-full break-words prose-a:no-underline', $style.content]"
                    v-html="content">
                </div>
            </Skeleton>
        </NuxtLink>
        <div v-if="note && note.media_attachments.length > 0" class="[&:not(:first-child)]:mt-6">
            <SocialElementsNotesAttachment v-for="attachment of note.media_attachments" :key="attachment.id"
                :attachment="attachment" />
        </div>
        <div v-if="isQuote && note?.reblog" class="mt-4">
            <SocialElementsNotesNote :note="note?.reblog" :small="true" />
        </div>
    </div>
    <div v-else
        class="rounded text-center ring-1 !max-w-full ring-white/10 h-52 mt-6 prose prose-invert p-4 flex flex-col justify-center items-center">
        <strong v-if="note?.sensitive" class="max-w-64">This note was tagged as containing sensitive
            content</strong>
        <!-- Spoiler text is it's specified -->
        <span v-if="note?.spoiler_text" class="mt-2 break-all">{{ note.spoiler_text
            }}</span>
        <ButtonsSecondary @click="collapsed = false" class="mt-4">Show content</ButtonsSecondary>
    </div>
</template>

<script lang="ts" setup>
import type { Status } from "~/types/mastodon/status";

const props = defineProps<{
    content: string | null;
    note?: Status;
    loaded?: boolean;
    url: string;
    shouldHide?: boolean;
    isQuote?: boolean;
}>();

const collapsed = ref(props.shouldHide);
</script>

<style module>
.content pre:has(code) {
    word-wrap: normal;
    background: transparent;
    background-color: #ffffff0d;
    border-radius: .25rem;
    -webkit-hyphens: none;
    hyphens: none;
    margin-top: 1rem;
    overflow-x: auto;
    padding: .75rem 1rem;
    -moz-tab-size: 4;
    -o-tab-size: 4;
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

.content code:not(pre code) {
    border-radius: .25rem;
    padding: .25rem .5rem;
    word-wrap: break-word;
    background: transparent;
    background-color: #ffffff0d;
    -webkit-hyphens: none;
    hyphens: none;
    margin-top: 1rem;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), 0 0 #0000;
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    --tw-ring-color: hsla(0, 0%, 100%, .1)
}
</style>