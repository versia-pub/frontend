import type { CustomEmoji } from "@versia/client/schemas";
import { go } from "fuzzysort";
import { nanoid } from "nanoid";
import type { z } from "zod";
import { type UnicodeEmoji, emojiGroups } from "./emoji";

export const EMOJI_PER_ROW = 7;
export type VirtualizedItem =
    | { headerId: string; type: "header"; name: string; categoryId: string }
    | {
          rowId: string;
          type: "emoji-row";
          emojis: (z.infer<typeof CustomEmoji> | UnicodeEmoji)[];
      };

export const getVirtualizedItems = (
    customCategories: Record<string, z.infer<typeof CustomEmoji>[]>,
    searchQuery?: string,
): VirtualizedItem[] => {
    const items: VirtualizedItem[] = [];

    // Add custom emoji categories first
    for (const [categoryName, categoryEmojis] of Object.entries(
        customCategories,
    )) {
        // Add category header
        items.push({
            headerId: nanoid(),
            type: "header",
            name: categoryName,
            categoryId: `custom-${categoryName}`,
        });

        // Add emoji rows for this category
        for (let i = 0; i < categoryEmojis.length; i += EMOJI_PER_ROW) {
            items.push({
                rowId: nanoid(),
                type: "emoji-row",
                emojis: categoryEmojis.slice(i, i + EMOJI_PER_ROW),
            });
        }
    }

    // Add unicode emoji groups
    for (const group of emojiGroups) {
        if (group.emojis.length === 0) {
            continue;
        }

        // Add group header
        items.push({
            headerId: nanoid(),
            type: "header",
            name: group.id,
            categoryId: group.id,
        });

        // Add emoji rows for this group
        for (let i = 0; i < group.emojis.length; i += EMOJI_PER_ROW) {
            items.push({
                rowId: nanoid(),
                type: "emoji-row",
                emojis: group.emojis.slice(i, i + EMOJI_PER_ROW),
            });
        }
    }

    // If search query is provided, add extra category for search results
    // with emojis that contain the search query in their shortcode
    // ordered with fuzzysort
    if (searchQuery) {
        const customEmojiMatches = Object.values(customCategories)
            .flat()
            .filter((emoji) =>
                emoji.shortcode
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
            );
        const unicodeEmojiMatches = emojiGroups
            .flatMap((group) => group.emojis)
            .filter((emoji) =>
                emoji.shortcode
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
            );

        const results = go(
            searchQuery,
            [...customEmojiMatches, ...unicodeEmojiMatches],
            {
                key: "shortcode",
                limit: 20,
            },
        );

        items.splice(0, 0, {
            headerId: nanoid(),
            type: "header",
            name: "Search Results",
            categoryId: "search-results",
        });

        for (let i = 0; i < results.length; i += EMOJI_PER_ROW) {
            const emojis = results
                .slice(i, i + EMOJI_PER_ROW)
                .map((result) => result.obj);

            items.splice(1 + i / EMOJI_PER_ROW, 0, {
                rowId: nanoid(),
                type: "emoji-row",
                emojis,
            });
        }
    }

    return items;
};
