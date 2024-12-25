import { VueRenderer } from "@tiptap/vue-3";
import tippy, { type Instance } from "tippy.js";

import type { MentionNodeAttrs } from "@tiptap/extension-mention";
import type { SuggestionOptions } from "@tiptap/suggestion";
import type { Account } from "@versia/client/types";
import { go } from "fuzzysort";
import MentionList from "./mentions-list.vue";

export type UserData = {
    key: string;
    value: Account;
};

export default {
    items: async ({ query }) => {
        if (query.length === 0) {
            return [];
        }

        const users = await client.value.searchAccount(query, { limit: 20 });

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
        let popup: Instance[] & Instance;

        return {
            onStart: (props) => {
                component = new VueRenderer(MentionList, {
                    props,
                    editor: props.editor,
                });

                if (!props.clientRect) {
                    return;
                }

                // @ts-expect-error Tippy types are wrong
                popup = tippy("body", {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: "manual",
                    placement: "bottom-start",
                });
            },

            onUpdate(props) {
                component.updateProps(props);

                if (!props.clientRect) {
                    return;
                }

                popup[0]?.setProps({
                    getReferenceClientRect: props.clientRect as () => DOMRect,
                });
            },

            onKeyDown(props) {
                if (props.event.key === "Escape") {
                    popup[0]?.hide();

                    return true;
                }

                return component.ref?.onKeyDown(props);
            },

            onExit() {
                popup[0]?.destroy();
                component.destroy();
            },
        };
    },
} as Omit<SuggestionOptions<UserData, MentionNodeAttrs>, "editor">;
