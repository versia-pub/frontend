import type { Mastodon } from "megalodon";

export const useNote = async (client: Mastodon | null, noteId: string) => {
    if (!client) {
        return null;
    }

    return (await client.getStatus(noteId)).data;
};
