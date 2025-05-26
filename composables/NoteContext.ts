import type { Client } from "@versia/client";
import type { Context } from "@versia/client/schemas";
import type { z } from "zod";

export const useNoteContext = (
    client: MaybeRef<Client | null>,
    noteId: MaybeRef<string | null>,
) => {
    if (!ref(client).value) {
        return ref(null as z.infer<typeof Context> | null);
    }

    const output = ref(null as z.infer<typeof Context> | null);

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
