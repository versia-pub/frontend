import { renderToString } from "vue/server-renderer";
import { SettingIds, type Settings, getSettingById } from "~/settings";
import type { Account } from "~/types/mastodon/account";
import type { Emoji } from "~/types/mastodon/emoji";
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
    settings: MaybeRef<Settings> = ref([]),
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

            const shouldRenderEmoji = getSettingById(
                toValue(settings),
                SettingIds.CustomEmojis,
            )?.value;

            // Replace emoji shortcodes with images
            if (shouldRenderEmoji) {
                const paragraphs = contentHtml.querySelectorAll("p");

                for (const paragraph of paragraphs) {
                    paragraph.innerHTML = paragraph.innerHTML.replace(
                        /:([a-z0-9_-]+):/g,
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
                                "h-6 align-text-bottom inline not-prose hover:scale-110 transition-transform duration-75 ease-in-out";
                            return image.outerHTML;
                        },
                    );
                }
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
    const display_name = computed(() => toValue(account)?.display_name ?? "");
    const note = computed(() => toValue(account)?.note ?? "");
    const fields = computed(() => toValue(account)?.fields ?? []);
    const emojis = computed(() => toValue(account)?.emojis ?? []);

    const parsedDisplayName = useParsedContent(
        display_name,
        emojis,
        undefined,
        settings,
    );

    const parsedNote = useParsedContent(note, emojis, undefined, settings);

    const parsedFields = computed(() =>
        fields.value.map((field) => ({
            ...field,
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
