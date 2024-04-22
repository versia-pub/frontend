import type { Mastodon } from "megalodon";

export const useAccount = async (
    client: Mastodon | null,
    accountId: string,
) => {
    if (process.server || !client) {
        return null;
    }

    return (await client.getAccount(accountId)).data;
};
