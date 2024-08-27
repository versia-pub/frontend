import type { Client } from "@versia/client";
import type { Context } from "@versia/client/types";

export const useNoteContext = (
    client: MaybeRef<Client | null>,
    noteId: MaybeRef<string | null>,
) => {
    if (!ref(client).value) {
        return ref(null as Context | null);
    }

    const output = ref(null as Context | null);

    watchEffect(() => {
        if (toValue(noteId)) {
            ref(client)
                .value?.getStatusContext(toValue(noteId) ?? "")
                .then((res) => {
                    output.value = res.data;
                });
        }
    });

    return output;
};
