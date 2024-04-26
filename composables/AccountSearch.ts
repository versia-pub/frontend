import type { Mastodon } from "megalodon";

export const useAccountSearch = async (client: Mastodon | null, q: string) => {
    if (!client) {
        return null;
    }

    return (
        await client.searchAccount(q, {
            resolve: true,
        })
    ).data;
};
