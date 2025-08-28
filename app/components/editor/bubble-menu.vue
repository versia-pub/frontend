<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3";
import { BubbleMenu } from "@tiptap/vue-3/menus";
import {
    BoldIcon,
    CurlyBracesIcon,
    ItalicIcon,
    StrikethroughIcon,
    SubscriptIcon,
    SuperscriptIcon,
    UnderlineIcon,
} from "lucide-vue-next";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

const { editor } = defineProps<{
    editor: Editor;
}>();

const active = ref<string[]>(
    [
        editor.isActive("bold") ? "bold" : null,
        editor.isActive("italic") ? "italic" : null,
        editor.isActive("underline") ? "underline" : null,
        editor.isActive("code") ? "code" : null,
        editor.isActive("strike") ? "strike" : null,
        editor.isActive("subscript") ? "subscript" : null,
        editor.isActive("superscript") ? "superscript" : null,
    ].filter((s) => s !== null),
);

watch(active, (value) => {
    if (value.includes("bold")) {
        editor.chain().focus().toggleBold().run();
    } else {
        editor.chain().unsetBold().run();
    }
    if (value.includes("italic")) {
        editor.chain().focus().toggleItalic().run();
    } else {
        editor.chain().unsetItalic().run();
    }
    if (value.includes("underline")) {
        editor.chain().focus().toggleUnderline().run();
    } else {
        editor.chain().unsetUnderline().run();
    }
    if (value.includes("code")) {
        editor.chain().focus().toggleCode().run();
    } else {
        editor.chain().unsetCode().run();
    }
    if (value.includes("strike")) {
        editor.chain().focus().toggleStrike().run();
    } else {
        editor.chain().unsetStrike().run();
    }
    if (value.includes("subscript")) {
        editor.chain().focus().toggleSubscript().run();
    } else {
        editor.chain().unsetSubscript().run();
    }
    if (value.includes("superscript")) {
        editor.chain().focus().toggleSuperscript().run();
    } else {
        editor.chain().unsetSuperscript().run();
    }
});
</script>

<template>
    <BubbleMenu :editor="editor">
        <ToggleGroup type="multiple"
            v-model="active"
             class="bg-popover rounded-md"
        >
            <ToggleGroupItem value="bold">
                <BoldIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic">
                <ItalicIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline">
                <UnderlineIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="code">
                <CurlyBracesIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="strike">
                <StrikethroughIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="subscript">
                <SubscriptIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="superscript">
                <SuperscriptIcon />
            </ToggleGroupItem>
        </ToggleGroup>
    </BubbleMenu>
</template>
