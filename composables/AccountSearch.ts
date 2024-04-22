import type { Mastodon } from "megalodon";

export const useAccountSearch = async (client: Mastodon | null, q: string) => {
    if (process.server || !client) {
        return null;
    }

    return (
        await client.searchAccount(q, {
            resolve: true,
        })
    ).data;
};
