import type { Emoji } from "@versia/client/types";
import { SettingIds } from "~/settings";

const emojisRegex =
    /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\uFE0F\u20E3?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u200D(\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\uFE0F\u20E3?|[\u{E0020}-\u{E007E}]+\u{E007F})?))*/gu;
const incorrectEmojisRegex = /^[#*0-9©®]$/;

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive<HTMLElement, Emoji[]>("render-emojis", {
        beforeMount(el, binding) {
            const shouldRenderEmoji = useSetting(SettingIds.CustomEmojis);
            const emojiFont = useSetting(SettingIds.EmojiTheme);

            // Replace emoji shortcodes with images
            if (shouldRenderEmoji.value.value) {
                el.innerHTML = el.innerHTML.replace(
                    /:([a-zA-Z0-9_-]+):/g,
                    (match, emoji) => {
                        const emojiData = binding.value.find(
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
                            "h-[1lh] align-middle inline not-prose hover:scale-110 transition-transform duration-75 ease-in-out";
                        return image.outerHTML;
                    },
                );
            }

            if (emojiFont.value.value !== "native") {
                el.innerHTML = el.innerHTML.replace(emojisRegex, (match) => {
                    if (incorrectEmojisRegex.test(match)) {
                        return match;
                    }

                    return `<img src="/emojis/${emojiFont}/${match}.svg" alt="${match}" class="h-[1em] inline not-prose hover:scale-110 transition-transform duration-75 ease-in-out">`;
                });
            }
        },
    });
});