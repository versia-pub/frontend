/**
 * Adapted from Cinny's code
 * @see https://github.com/cinnyapp/cinny/blob/e6f4eeca8edc85ab64179e545b4e2e8c15763633/src/app/plugins/emoji.ts
 */

import type { CompactEmoji } from "emojibase";
import emojisData from "emojibase-data/en/compact.json";
import joypixels from "emojibase-data/en/shortcodes/joypixels.json";

export type UnicodeEmoji = CompactEmoji & {
    shortcode: string;
};

export enum EmojiGroupId {
    People = "People",
    Nature = "Nature",
    Food = "Food",
    Activity = "Activity",
    Travel = "Travel",
    Object = "Object",
    Symbol = "Symbol",
    Flag = "Flag",
}

export type UnicodeEmojiGroup = {
    id: EmojiGroupId;
    order: number;
    emojis: UnicodeEmoji[];
};

export const getShortcodesFor = (
    hexcode: string,
): string[] | string | undefined => joypixels[hexcode];

export const getShortcodeFor = (hexcode: string): string | undefined => {
    const shortcode = joypixels[hexcode];
    return Array.isArray(shortcode) ? shortcode[0] : shortcode;
};

export const emojiGroups: UnicodeEmojiGroup[] = [
    {
        id: EmojiGroupId.People,
        order: 0,
        emojis: [],
    },
    {
        id: EmojiGroupId.Nature,
        order: 1,
        emojis: [],
    },
    {
        id: EmojiGroupId.Food,
        order: 2,
        emojis: [],
    },
    {
        id: EmojiGroupId.Activity,
        order: 3,
        emojis: [],
    },
    {
        id: EmojiGroupId.Travel,
        order: 4,
        emojis: [],
    },
    {
        id: EmojiGroupId.Object,
        order: 5,
        emojis: [],
    },
    {
        id: EmojiGroupId.Symbol,
        order: 6,
        emojis: [],
    },
    {
        id: EmojiGroupId.Flag,
        order: 7,
        emojis: [],
    },
];

export const emojis: UnicodeEmoji[] = [];

function addEmojiToGroup(groupIndex: number, emoji: UnicodeEmoji) {
    emojiGroups[groupIndex]?.emojis.push(emoji);
}

function getGroupIndex(emoji: UnicodeEmoji): number | undefined {
    switch (emoji.group) {
        case 0:
        case 1:
            return 0; // People
        case 3:
            return 1; // Nature
        case 4:
            return 2; // Food
        case 6:
            return 3; // Activity
        case 5:
            return 4; // Travel
        case 7:
            return 5; // Object
        case 8:
        case undefined:
            return 6; // Symbol
        case 9:
            return 7; // Flag
        default:
            return undefined; // Unknown group
    }
}

for (const emoji of emojisData) {
    const myShortCodes = getShortcodesFor(emoji.hexcode);

    if (!myShortCodes) {
        continue;
    }
    if (Array.isArray(myShortCodes) && myShortCodes.length === 0) {
        continue;
    }

    const em: UnicodeEmoji = {
        ...emoji,
        shortcode: Array.isArray(myShortCodes)
            ? (myShortCodes[0] as string)
            : myShortCodes,
        shortcodes: Array.isArray(myShortCodes)
            ? myShortCodes
            : emoji.shortcodes,
    };

    const groupIndex = getGroupIndex(em);

    if (groupIndex !== undefined) {
        addEmojiToGroup(groupIndex, em);
        emojis.push(em);
    }
}
