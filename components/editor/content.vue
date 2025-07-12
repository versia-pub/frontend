<template>
    <BubbleMenu :editor="editor" />
    <EditorContent :editor="editor"
        v-bind="$attrs"
        :class="[$style.content, 'relative prose prose-sm dark:prose-invert break-words prose-a:no-underline prose-a:hover:underline prose-p:first-of-type:mt-0']" />
</template>

<script lang="ts" setup>
import Emoji, { emojis } from "@tiptap/extension-emoji";
import Highlight from "@tiptap/extension-highlight";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import Mention from "@tiptap/extension-mention";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Placeholder } from "@tiptap/extensions";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import BubbleMenu from "./bubble-menu.vue";
import { emojiSuggestion, mentionSuggestion } from "./suggestion.ts";

const content = defineModel<string>("content");
const rawContent = defineModel<string>("rawContent");
const {
    placeholder,
    disabled,
    mode = "rich",
} = defineProps<{
    placeholder?: string;
    mode?: "rich" | "plain";
    disabled?: boolean;
}>();

const emit = defineEmits<{
    pasteFiles: [files: File[]];
}>();

const editor = new Editor({
    extensions: [
        StarterKit,
        Placeholder.configure({
            placeholder,
        }),
        Highlight,
        Subscript,
        Superscript,
        TaskList,
        TaskItem,
        Mention.configure({
            HTMLAttributes: {
                class: "mention",
            },
            suggestion: mentionSuggestion,
        }),
        Emoji.configure({
            emojis: emojis.concat(
                identity.value?.emojis.map((emoji) => ({
                    name: emoji.shortcode,
                    shortcodes: [emoji.shortcode],
                    group: emoji.category ?? undefined,
                    tags: [],
                    fallbackImage: emoji.url,
                })) || [],
            ),
            HTMLAttributes: {
                class: "emoji not-prose",
            },
            suggestion: emojiSuggestion,
        }),
    ],
    content: content.value,
    onUpdate: ({ editor }) => {
        content.value = mode === "rich" ? editor.getHTML() : editor.getText();
        rawContent.value = editor.getText();
    },
    onPaste: (event) => {
        // If pasting files, prevent the default behavior
        if (event.clipboardData && event.clipboardData.files.length > 0) {
            event.preventDefault();
            const files = Array.from(event.clipboardData.files);
            emit("pasteFiles", files);
        }
    },
    autofocus: true,
    editable: !disabled,
});

watchEffect(() => {
    if (disabled) {
        editor.setEditable(false);
    } else {
        editor.setEditable(true);
    }
});

onUnmounted(() => {
    editor.destroy();
});
</script>

<style module>
@import url("~/styles/content.css");
</style>

<style>
@reference "../../styles/index.css";

.tiptap p.is-editor-empty:first-child::before {
    color: var(--muted-foreground);
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
}

.tiptap .mention {
    @apply font-bold rounded-sm text-primary-foreground bg-primary px-1 py-0.5;
}

.tiptap .emoji>img {
    @apply h-[1lh] align-middle inline hover:scale-110 transition-transform duration-75 ease-in-out;
}
</style>
