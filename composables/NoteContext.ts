import type { Mastodon } from "megalodon";
import type { Context } from "~/types/mastodon/context";

export const useNoteContext = (
    client: MaybeRef<Mastodon | null>,
    noteId: MaybeRef<string | null>,
) => {
    if (!ref(client).value) {
        return ref(null as Context | null);
    }

    const output = ref(null as Context | null);

    watchEffect(() => {
        if (toValue(noteId))
            ref(client)
                .value?.getStatusContext(toValue(noteId) ?? "")
                .then((res) => {
                    output.value = res.data as Context;
                });
    });

    return output;
};
