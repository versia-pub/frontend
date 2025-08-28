import { computePosition, flip, shift } from "@floating-ui/dom";
import type { Editor } from "@tiptap/core";
import type { MentionNodeAttrs } from "@tiptap/extension-mention";
import type { SuggestionOptions } from "@tiptap/suggestion";
import { posToDOMRect, VueRenderer } from "@tiptap/vue-3";
import type { Account, CustomEmoji } from "@versia/client/schemas";
import { go } from "fuzzysort";
import type { z } from "zod";
import EmojiList from "./emojis-list.vue";
import MentionList from "./mentions-list.vue";

export type UserData = {
    key: string;
    value: z.infer<typeof Account>;
};

const authStore = useAuthStore();

const updatePosition = (editor: Editor, element: HTMLElement): void => {
    const virtualElement = {
        getBoundingClientRect: () =>
            posToDOMRect(
                editor.view,
                editor.state.selection.from,
                editor.state.selection.to,
            ),
    };

    computePosition(virtualElement, element, {
        placement: "bottom-start",
        strategy: "absolute",
        middleware: [shift(), flip()],
    }).then(({ x, y, strategy }) => {
        element.style.width = "max-content";
        element.style.position = strategy;
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
    });
};

export const mentionSuggestion = {
    items: async ({ query }) => {
        if (query.length === 0) {
            return [];
        }

        const users = await authStore.client.searchAccount(query, {
            limit: 20,
        });

        return go(
            query,
            users.data
                // Deduplicate users
                .filter(
                    (user, index, self) =>
                        self.findIndex((u) => u.acct === user.acct) === index,
                )
                .map((user) => ({
                    key: user.acct,
                    value: user,
                })),
            { key: "key" },
        )
            .map((result) => ({
                key: result.obj.key,
                value: result.obj.value,
            }))
            .slice(0, 20);
    },

    render: () => {
        let component: VueRenderer;

        return {
            onStart: (props) => {
                component = new VueRenderer(MentionList, {
                    props,
                    editor: props.editor,
                });

                if (!props.clientRect || !component.element) {
                    return;
                }

                (component.element as HTMLElement).style.position = "absolute";

                props.editor.view.dom.parentElement?.appendChild(
                    component.element,
                );

                updatePosition(props.editor, component.element as HTMLElement);
            },

            onUpdate(props) {
                component.updateProps(props);

                if (!props.clientRect) {
                    return;
                }

                updatePosition(props.editor, component.element as HTMLElement);
            },

            onKeyDown(props) {
                if (props.event.key === "Escape") {
                    component.destroy();

                    return true;
                }

                return component.ref?.onKeyDown(props);
            },

            onExit() {
                component.element?.remove();
                component.destroy();
            },
        };
    },
} as Omit<SuggestionOptions<UserData, MentionNodeAttrs>, "editor">;

export const emojiSuggestion = {
    items: ({ query }) => {
        if (query.length === 0) {
            return [];
        }

        const emojis = authStore.emojis;

        return go(
            query,
            emojis
                .filter((emoji) => emoji.shortcode.includes(query))
                .map((emoji) => ({
                    key: emoji.shortcode,
                    value: emoji,
                })),
            { key: "key" },
        )
            .map((result) => result.obj.key)
            .slice(0, 20);
    },
    render: () => {
        let component: VueRenderer;

        return {
            onStart: (props) => {
                component = new VueRenderer(EmojiList, {
                    props,
                    editor: props.editor,
                });

                if (!props.clientRect || !component.element) {
                    return;
                }

                (component.element as HTMLElement).style.position = "absolute";

                props.editor.view.dom.parentElement?.appendChild(
                    component.element,
                );

                updatePosition(props.editor, component.element as HTMLElement);
            },

            onUpdate(props) {
                component.updateProps(props);

                if (!props.clientRect) {
                    return;
                }

                updatePosition(props.editor, component.element as HTMLElement);
            },

            onKeyDown(props) {
                if (props.event.key === "Escape") {
                    component.destroy();

                    return true;
                }

                return component.ref?.onKeyDown(props);
            },

            onExit() {
                component.element?.remove();
                component.destroy();
            },
        };
    },
} as Omit<SuggestionOptions<string>, "editor">;
