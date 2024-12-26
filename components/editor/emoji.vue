<template>
    <NodeViewWrapper as="span">
        <img v-if="emojiData" :src="emojiData.url" class="h-[1lh] align-middle inline not-prose hover:scale-110 transition-transform duration-75 ease-in-out" :alt="emojiData.description || `:${emojiData.shortcode}:`" :title="emojiData.shortcode" />
        <img v-else src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cdefs%3E%3Cpattern id='a' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath fill='%23ff00dc' d='M0 0h50v50H0zm50 50h50v50H50z'/%3E%3Cpath fill='%23010001' d='M50 0h50v50H50zM0 50h50v50H0z'/%3E%3C/pattern%3E%3C/defs%3E%3Cpath fill='url(%23a)' d='M0 0h100v100H0z'/%3E%3C/svg%3E" class="h-[1lh] align-middle inline not-prose hover:scale-110 transition-transform duration-75 ease-in-out" alt="A purple and black missing texture image" title="Emoji not found" />
    </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { type NodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

const { node } = defineProps<NodeViewProps>();

const emojiData = computed(() =>
    identity.value?.emojis.find((e) => e.shortcode === node.attrs.shortcode),
);
</script>
