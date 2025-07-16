import type { Client } from "@versia/client";
import type { Account } from "@versia/client/schemas";
import type { z } from "zod";

export const useAccountFromAcct = (
    client: MaybeRef<Client | null>,
    acct: string,
): {
    account: Ref<z.infer<typeof Account> | null>;
    isLoading: Ref<boolean>;
} => {
    const output = ref(null as z.infer<typeof Account> | null);
    const isLoading = ref(true);

    ref(client)
        .value?.lookupAccount(acct)
        .then((res) => {
            isLoading.value = false;
            output.value = res.data;
        });

    return { account: output, isLoading };
};
