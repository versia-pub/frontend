import type { Client } from "@versia/client";
import type { Status } from "@versia/client/schemas";
import type { z } from "zod";

export const useNote = (
    client: MaybeRef<Client | null>,
    noteId: MaybeRef<string | null>,
) => {
    if (!(toValue(client) && toValue(noteId))) {
        return ref(null as z.infer<typeof Status> | null);
    }

    const output = ref(null as z.infer<typeof Status> | null);

    watchEffect(() => {
        toValue(noteId) &&
            toValue(client)
                ?.getStatus(toValue(noteId) as string)
                .then((res) => {
                    output.value = res.data;
                });
    });

    return output;
};
