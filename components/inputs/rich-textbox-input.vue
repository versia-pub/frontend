<template>
    <div class="relative">
        <textarea v-bind="$attrs" ref="textarea" v-model="content"
            class="resize-none min-h-48 prose prose-invert w-full p-0 !ring-none !border-none !outline-none placeholder:text-zinc-500 bg-transparent appearance-none focus:!border-none focus:!outline-none disabled:cursor-not-allowed"
            aria-label="Compose your message" :autofocus="true"></textarea>
        <div v-if="maxCharacters"
            :class="['absolute bottom-0 right-0 p-2 text-gray-300 font-semibold text-xs', remainingCharacters < 0 && 'text-red-500']"
            aria-live="polite">
            {{ remainingCharacters }}
        </div>
        <EmojiSuggestbox :textarea="textarea" v-if="!!currentlyBeingTypedEmoji"
            :currently-typing-emoji="currentlyBeingTypedEmoji" @autocomplete="autocompleteEmoji" />
        <MentionSuggestbox :textarea="textarea" v-if="!!currentlyBeingTypedMention"
            :currently-typing-mention="currentlyBeingTypedMention" @autocomplete="autocompleteMention" />
    </div>
</template>

<script lang="ts" setup>
import { char, createRegExp, exactly } from "magic-regexp";
import EmojiSuggestbox from "../composer/emoji-suggestbox.vue";
import MentionSuggestbox from "../composer/mention-suggestbox.vue";

defineOptions({
    inheritAttrs: false,
});
const props = defineProps<{
    maxCharacters?: number;
}>();

const modelContent = defineModel<string>("modelContent", {
    required: true,
});

const textarea = ref<HTMLTextAreaElement | undefined>(undefined);
const { input: content } = useTextareaAutosize({
    element: textarea,
    input: modelContent,
});

const remainingCharacters = computed(
    () =>
        (props.maxCharacters ?? Number.POSITIVE_INFINITY) -
        (content.value?.length ?? 0),
);
const currentlyBeingTypedEmoji = computed(() => {
    const match = content.value?.match(partiallyTypedEmojiValidator);
    return match ? (match.at(-1)?.replace(":", "") ?? "") : null;
});
const currentlyBeingTypedMention = computed(() => {
    const match = content.value?.match(partiallyTypedMentionValidator);
    return match ? (match.at(-1)?.replace("@", "") ?? "") : null;
});

const autocompleteEmoji = (emoji: string) => {
    // Replace the end of the string with the emoji
    content.value = content.value?.replace(
        createRegExp(
            exactly(":"),
            exactly(currentlyBeingTypedEmoji.value ?? "").notBefore(char),
        ),
        `:${emoji}:`,
    );
};

const autocompleteMention = (mention: string) => {
    // Replace the end of the string with the mention
    content.value = content.value?.replace(
        createRegExp(
            exactly("@"),
            exactly(currentlyBeingTypedMention.value ?? "").notBefore(char),
        ),
        `@${mention} `,
    );
};
</script>