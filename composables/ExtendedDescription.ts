import type { Client } from "@versia/client";
import type { ExtendedDescription } from "@versia/client/schemas";
import type { z } from "zod";

export const useExtendedDescription = (client: MaybeRef<Client | null>) => {
    if (!ref(client).value) {
        return ref(null as z.infer<typeof ExtendedDescription> | null);
    }

    const output = ref(null as z.infer<typeof ExtendedDescription> | null);

    ref(client)
        .value?.getInstanceExtendedDescription()
        .then((res) => {
            output.value = res.data;
        });

    return output;
};
