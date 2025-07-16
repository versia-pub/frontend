import { mkdir, writeFile } from "node:fs/promises";
import { getIconData, iconToHTML, iconToSVG, replaceIDs } from "@iconify/utils";
import * as fluentEmojiData from "@iconify-json/fluent-emoji";
import * as fluentFlatEmojiData from "@iconify-json/fluent-emoji-flat";
import * as notoEmojiData from "@iconify-json/noto";
import * as twemojiData from "@iconify-json/twemoji";

const emojiSets = {
    twemoji: twemojiData,
    noto: notoEmojiData,
    fluent: fluentEmojiData,
    "fluent-flat": fluentFlatEmojiData,
} as const;

const prerenderEmojis = (set: keyof typeof emojiSets) => {
    const data = emojiSets[set];

    // Outputs an object in the format { "emoji": "<svg ... />" }
    const emojisToName = Object.entries(data.chars).map(([unicode, name]) => {
        const emojiUnicode = String.fromCodePoint(
            ...unicode.split("-").map((c) => Number.parseInt(c, 16)),
        );

        return [emojiUnicode, name] as const;
    });

    // Get the SVG for each emoji
    return Object.fromEntries(
        emojisToName.map(([emoji, name]) => {
            const iconData = getIconData(data.icons, name);

            if (!iconData) {
                throw new Error(`Icon not found: ${name}`);
            }

            const svg = iconToSVG(iconData, {
                width: 64,
                height: 64,
            });

            return [
                emoji,
                iconToHTML(replaceIDs(svg.body), svg.attributes),
            ] as const;
        }),
    );
};

// Pregenerates images for all sets and places them in public/emojis/<set>/<unicode_name>.svg
const pregenerateImages = async (set: keyof typeof emojiSets) => {
    const emojis = prerenderEmojis(set);

    const setDir = `public/emojis/${set}`;

    await mkdir(setDir, { recursive: true });

    for (const [emoji, svg] of Object.entries(emojis)) {
        await writeFile(`${setDir}/${emoji}.svg`, svg);
    }
};

for (const set of Object.keys(emojiSets) as (keyof typeof emojiSets)[]) {
    pregenerateImages(set);
}
