import type { Mastodon } from "megalodon";

export const useExtendedDescription = async (client: Mastodon | null) => {
    if (!client) {
        return null;
    }

    return (await client.client.get("/api/v1/instance/extended_description"))
        .data as {
        updated_at: string;
        content: string;
    };
};
