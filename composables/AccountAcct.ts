import type { Client } from "@versia/client";
import type { Account } from "@versia/client/types";

export const useAccountFromAcct = (
    client: MaybeRef<Client | null>,
    acct: string,
): { account: Ref<Account | null>; isLoading: Ref<boolean> } => {
    const output = ref(null as Account | null);
    const isLoading = ref(true);

    ref(client)
        .value?.lookupAccount(acct)
        .then((res) => {
            isLoading.value = false;
            output.value = res.data;
        });

    return { account: output, isLoading };
};
