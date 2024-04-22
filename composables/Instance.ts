import type { Mastodon } from "megalodon";

export const useInstance = async (client: Mastodon | null) => {
    if (!client) {
        return null;
    }

    return (await client.getInstance()).data;
};
