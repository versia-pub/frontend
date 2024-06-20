import type { LysandClient } from "@lysand-org/client";
import type { Account } from "@lysand-org/client/types";

export const useAccount = (
    client: MaybeRef<LysandClient | null>,
    accountId: MaybeRef<string | null>,
) => {
    if (!client) {
        return ref(null as Account | null);
    }

    const output = ref(null as Account | null);

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
