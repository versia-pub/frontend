import type { Client } from "@versia/client";
import type { Account } from "@versia/client/schemas";
import type { z } from "zod";

export const useAccountSearch = (
    client: MaybeRef<Client | null>,
    q: string,
): Ref<z.infer<typeof Account>[] | null> => {
    const output = ref(null as z.infer<typeof Account>[] | null);

    ref(client)
        .value?.searchAccount(q, {
            resolve: true,
        })
        .then((res) => {
            output.value = res.data;
        });

    return output;
};
