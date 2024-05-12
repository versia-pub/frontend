import type { Mastodon } from "megalodon";
import type { Status } from "~/types/mastodon/status";

export const useNote = (client: MaybeRef<Mastodon | null>, noteId: string) => {
    if (!ref(client).value) {
        return ref(null as Status | null);
    }

    const output = ref(null as Status | null);

    ref(client)
        .value?.getStatus(noteId)
        .then((res) => {
            output.value = res.data as Status;
        });

    return output;
};
