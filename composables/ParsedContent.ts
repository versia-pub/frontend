import type { Account } from "~/types/mastodon/account";
import type { Emoji } from "~/types/mastodon/emoji";
import MentionComponent from "../components/social-elements/notes/mention.vue";
import { renderToString } from "vue/server-renderer";

/**
 * Takes in an HTML string, parses emojis and returns a reactive object with the parsed content.
 * @param content String of HTML content to parse
 * @param emojis Array of emojis to parse
 * @returns Reactive object with the parsed content
 */
export const useParsedContent = async (
    content: string,
    emojis: Emoji[],
    mentions: Account[],
): Promise<Ref<string>> => {
    const contentHtml = document.createElement("div");
    contentHtml.innerHTML = content;

    // Replace emoji shortcodes with images
    const paragraphs = contentHtml.querySelectorAll("p");

    for (const paragraph of paragraphs) {
        paragraph.innerHTML = paragraph.innerHTML.replace(
            /:([a-z0-9_-]+):/g,
            (match, emoji) => {
                const emojiData = emojis.find((e) => e.shortcode === emoji);
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

    // Replace links containing mentions with interactive mentions
    const links = contentHtml.querySelectorAll("a");

    for (const link of links) {
        const mention = mentions.find((m) => link.textContent === `@${m.acct}`);
        if (!mention) {
            continue;
        }

        const renderedMention = h(MentionComponent);
        renderedMention.props = {
            account: mention,
        };

        link.outerHTML = await renderToString(renderedMention);
    }
    return ref(contentHtml.innerHTML);
};
