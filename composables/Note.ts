import type { Mastodon } from "megalodon";
import type { Status } from "~/types/mastodon/status";

export const useNote = (client: Mastodon | null, noteId: string) => {
    if (!client) {
        return ref(null as Status | null);
    }

    const output = ref(null as Status | null);

    client.getStatus(noteId).then((res) => {
        output.value = res.data;
    });

    return output;
};
