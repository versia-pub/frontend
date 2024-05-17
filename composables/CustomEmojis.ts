import type { Emoji } from "~/types/mastodon/emoji";

export const useCustomEmojis = () => {
    // Cache in localStorage
    return useLocalStorage<Emoji[]>("lysand:custom_emojis", []);
};
