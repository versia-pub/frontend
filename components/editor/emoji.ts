/**
 * Adapted from https://github.com/ueberdosis/tiptap/blob/main/packages/extension-image/src/image.ts
 */

import { Node, nodeInputRule } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import EmojiVue from "./emoji.vue";

export interface EmojiOptions {
    /**
     * Shortcode of the emoji.
     */
    shortcode: string;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        emoji: {
            /**
             * Add an emoji
             * @param options The image attributes
             * @example
             * editor
             *   .commands
             *   .setEmoji({ shortcode: 'smile' })
             */
            setImage: (options: {
                shortcode: string;
            }) => ReturnType;
        };
    }
}

/**
 * Matches an emoji to a :shortcode: on input.
 */
export const inputRegex = /(?:^|\s)(:([a-zA-Z0-9_]+):)$/;

/**
 * This extension allows you to insert emojis.
 */
export const Emoji = Node.create<EmojiOptions>({
    name: "emoji",

    draggable: true,

    group: "inline",

    inline: true,

    addAttributes() {
        return {
            shortcode: {
                default: this.options.shortcode,
            },
        };
    },

    renderHTML({ node }) {
        return `:${node.attrs.shortcode}:`;
    },

    addNodeView() {
        return VueNodeViewRenderer(EmojiVue);
    },

    addInputRules() {
        return [
            nodeInputRule({
                find: inputRegex,
                type: this.type,
                getAttributes: (match) => {
                    const [, , shortcode] = match;

                    return { shortcode };
                },
            }),
        ];
    },
});
