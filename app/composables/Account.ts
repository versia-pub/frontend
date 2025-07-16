import type { Client } from "@versia/client";
import type { Account } from "@versia/client/schemas";
import type { z } from "zod";

export const useAccount = (
    client: MaybeRef<Client | null>,
    accountId: MaybeRef<string | null>,
) => {
    if (!client) {
        return ref(null as z.infer<typeof Account> | null);
    }

    const output = ref(null as z.infer<typeof Account> | null);

    watchEffect(() => {
        if (toValue(accountId)) {
            toValue(client)
                ?.getAccount(toValue(accountId) ?? "")
                .then((res) => {
                    output.value = res.data;
                });
        }
    });

    return output;
};
