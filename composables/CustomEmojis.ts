import type { Mastodon } from "megalodon";
import type { Emoji } from "~/types/mastodon/emoji";

export const useCustomEmojis = (client: MaybeRef<Mastodon | null>) => {
    // Cache in localStorage
    return useLocalStorage<Emoji[]>("lysand:custom_emojis", []);
};
