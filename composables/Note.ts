import type { Client } from "@versia/client";
import type { Status } from "@versia/client/types";

export const useNote = (client: MaybeRef<Client | null>, noteId: string) => {
    if (!ref(client).value) {
        return ref(null as Status | null);
    }

    const output = ref(null as Status | null);

    ref(client)
        .value?.getStatus(noteId)
        .then((res) => {
            output.value = res.data;
        });

    return output;
};
