<template>
    <ComposerSuggestbox class="max-h-40 overflow-auto !w-auto !flex-row">
        <div v-for="(emoji, index) in topEmojis" :key="emoji.shortcode" @click="emit('autocomplete', emoji.shortcode)"
            :ref="el => { if (el) emojiRefs[index] = el as Element }" :title="emoji.shortcode"
            :class="['flex', 'justify-center', 'shrink-0', 'items-center', 'p-2', 'size-12', 'hover:bg-dark-900/70', { 'bg-primary-500': index === selectedEmojiIndex }]">
            <img :src="emoji.url" class="w-full h-full object-contain"
                :alt="`Emoji with shortcode ${emoji.shortcode}`" />
        </div>
    </ComposerSuggestbox>
</template>

<script lang="ts" setup>
import { distance } from "fastest-levenshtein";
import type { CustomEmoji } from "~/composables/Identities";
const props = defineProps<{
    currentlyTypingEmoji: string | null;
}>();

const emojiRefs = ref<Element[]>([]);
const { Tab, ArrowRight, ArrowLeft, Enter } = useMagicKeys({
    passive: false,
    onEventFired(e) {
        if (
            ["Tab", "Enter", "ArrowRight", "ArrowLeft"].includes(e.key) &&
            topEmojis.value !== null
        )
            e.preventDefault();
    },
});
const identity = useCurrentIdentity();
const topEmojis = ref<CustomEmoji[] | null>(null);
const selectedEmojiIndex = ref<number | null>(null);

watchEffect(() => {
    if (!identity.value) return;

    if (props.currentlyTypingEmoji !== null)
        topEmojis.value = identity.value.emojis
            .map((emoji) => ({
                ...emoji,
                distance: distance(
                    props.currentlyTypingEmoji as string,
                    emoji.shortcode,
                ),
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 20);
    else topEmojis.value = null;

    if (ArrowRight?.value && topEmojis.value !== null) {
        selectedEmojiIndex.value = (selectedEmojiIndex.value ?? -1) + 1;
        if (selectedEmojiIndex.value >= topEmojis.value.length) {
            selectedEmojiIndex.value = 0;
        }
        emojiRefs.value[selectedEmojiIndex.value]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }

    if (ArrowLeft?.value && topEmojis.value !== null) {
        selectedEmojiIndex.value =
            (selectedEmojiIndex.value ?? topEmojis.value.length) - 1;
        if (selectedEmojiIndex.value < 0) {
            selectedEmojiIndex.value = topEmojis.value.length - 1;
        }
        emojiRefs.value[selectedEmojiIndex.value]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }

    if ((Tab?.value || Enter?.value) && topEmojis.value !== null) {
        const emoji = topEmojis.value[selectedEmojiIndex.value ?? 0];
        if (emoji) emit("autocomplete", emoji.shortcode);
    }
});

// When currentlyTypingEmoji changes, reset the selected emoji index
watch(
    () => props.currentlyTypingEmoji,
    () => {
        selectedEmojiIndex.value = null;
    },
);

const emit = defineEmits<{
    autocomplete: [emoji: string];
}>();
</script>