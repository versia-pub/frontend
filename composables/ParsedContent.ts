import type { Account, Emoji } from "@versia/client/types";
import { renderToString } from "vue/server-renderer";
import { SettingIds, type Settings } from "~/settings";
import MentionComponent from "../components/social-elements/notes/mention.vue";

/**
 * Takes in an HTML string, parses emojis and returns a reactive object with the parsed content.
 * @param content String of HTML content to parse
 * @param emojis Array of emojis to parse
 * @returns Reactive object with the parsed content
 */
export const useParsedContent = (
    content: MaybeRef<string>,
    emojis: MaybeRef<Emoji[]>,
    mentions: MaybeRef<Account[]> = ref([]),
    settings: MaybeRef<Settings | null> = ref(null),
): Ref<string | null> => {
    const result = ref(null as string | null);

    watch(
        isRef(content)
            ? isRef(emojis)
                ? [content, mentions, emojis]
                : [content, mentions]
            : mentions,
        async () => {
            const contentHtml = document.createElement("div");
            contentHtml.innerHTML = toValue(content);

            const shouldRenderEmoji =
                toValue(settings)?.[SettingIds.CustomEmojis].value;

            // Replace emoji shortcodes with images
            if (shouldRenderEmoji) {
                contentHtml.innerHTML = contentHtml.innerHTML.replace(
                    /:([a-zA-Z0-9_-]+):/g,
                    (match, emoji) => {
                        const emojiData = toValue(emojis).find(
                            (e) => e.shortcode === emoji,
                        );
                        if (!emojiData) {
                            return match;
                        }
                        const image = document.createElement("img");
                        image.src = emojiData.url;
                        image.alt = `:${emoji}:`;
                        image.title = emojiData.shortcode;
                        image.className =
                            "h-[1.6em] mt-[-0.2ex] mx-1 mb-[0.2ex] align-middle inline not-prose hover:scale-110 transition-transform duration-75 ease-in-out";
                        return image.outerHTML;
                    },
                );
            }

            // Replace links containing mentions with interactive mentions
            const links = contentHtml.querySelectorAll("a");

            for (const link of links) {
                const mention = toValue(mentions).find(
                    (m) => link.textContent === `@${m.acct}`,
                );
                if (!mention) {
                    continue;
                }

                const renderedMention = h(MentionComponent);
                renderedMention.props = {
                    account: mention,
                };

                link.outerHTML = await renderToString(renderedMention);
            }

            result.value = contentHtml.innerHTML;
        },
        { immediate: true },
    );

    return result;
};

export const useParsedAccount = (
    account: MaybeRef<Account | undefined | null>,
    settings: MaybeRef<Settings>,
) => {
    const displayName = computed(() => toValue(account)?.display_name ?? "");
    const note = computed(() => toValue(account)?.note ?? "");
    const fields = computed(() => toValue(account)?.fields ?? []);
    const emojis = computed(() => toValue(account)?.emojis ?? []);

    const parsedDisplayName = useParsedContent(
        displayName,
        emojis,
        undefined,
        settings,
    );

    const parsedNote = useParsedContent(note, emojis, undefined, settings);

    const parsedFields = computed(() =>
        fields.value.map((field) => ({
            ...field,
            name: useParsedContent(field.name, emojis, undefined, settings)
                .value,
            value: useParsedContent(field.value, emojis, undefined, settings)
                .value,
        })),
    );

    return {
        display_name: parsedDisplayName,
        note: parsedNote,
        fields: parsedFields,
    };
};
