<template>
    <EditorContent :editor="editor"
        :class="[$style.content, 'prose prose-sm dark:prose-invert break-words prose-a:no-underline prose-a:hover:underline prose-p:first-of-type:mt-0']" />
</template>

<script lang="ts" setup>
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { Emoji } from "./emoji.ts";
import suggestion from "./suggestion.ts";

const content = defineModel<string>("content");
const {
    placeholder,
    disabled,
    mode = "rich",
} = defineProps<{
    placeholder?: string;
    mode?: "rich" | "plain";
    disabled?: boolean;
}>();

const editor = new Editor({
    extensions: [
        StarterKit,
        Placeholder.configure({
            placeholder,
        }),
        Highlight,
        Link,
        Subscript,
        Superscript,
        Underline,
        Mention.configure({
            HTMLAttributes: {
                class: "mention",
            },
            suggestion,
        }),
        Emoji,
    ],
    content: content.value,
    onUpdate: ({ editor }) => {
        content.value = mode === "rich" ? editor.getHTML() : editor.getText();
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
</style>
