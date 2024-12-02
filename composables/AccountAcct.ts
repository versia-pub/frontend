import type { Client } from "@versia/client";
import type { Account } from "@versia/client/types";

export const useAccountFromAcct = (
    client: MaybeRef<Client | null>,
    acct: string,
): Ref<Account | null> => {
    const output = ref(null as Account | null);

    ref(client)
        .value?.lookupAccount(acct)
        .then((res) => {
            output.value = res.data;
        });

    return output;
};
