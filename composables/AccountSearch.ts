import type { Client } from "@versia/client";
import type { Account } from "@versia/client/types";

export const useAccountSearch = (
    client: MaybeRef<Client | null>,
    q: string,
): Ref<Account[] | null> => {
    const output = ref(null as Account[] | null);

    ref(client)
        .value?.searchAccount(q, {
            resolve: true,
        })
        .then((res) => {
            output.value = res.data;
        });

    return output;
};
