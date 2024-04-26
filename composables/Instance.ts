import type { Mastodon } from "megalodon";
import type { Instance } from "~/types/mastodon/instance";

export const useInstance = async (client: Mastodon | null) => {
    if (!client) {
        return null;
    }

    return (await client.getInstance()).data as Instance & {
        banner?: string;
        lysand_version?: string;
    };
};
