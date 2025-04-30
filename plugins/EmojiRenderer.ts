import type { Emoji } from "@versia/client/types";

const emojisRegex =
    /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\uFE0F\u20E3?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u200D(\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\uFE0F\u20E3?|[\u{E0020}-\u{E007E}]+\u{E007F})?))*/gu;
const incorrectEmojisRegex = /^[#*0-9©®]$/;

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive<HTMLElement, Emoji[]>("render-emojis", {
        beforeMount(el, binding) {
            // Replace emoji shortcodes with images
            if (preferences.custom_emojis.value) {
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

            if (preferences.emoji_theme.value !== "native") {
                el.innerHTML = el.innerHTML.replace(emojisRegex, (match) => {
                    if (incorrectEmojisRegex.test(match)) {
                        return match;
                    }

                    return `<img src="/emojis/${preferences.emoji_theme.value}/${match}.svg" alt="${match}" class="h-[1em] inline not-prose hover:scale-110 transition-transform duration-75 ease-in-out">`;
                });
            }

            // Make all links that don't open to the same origin open in a new tab
            for (const link of el.querySelectorAll("a")) {
                if (link.hostname !== location.hostname) {
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                }
            }
        },
    });
});
