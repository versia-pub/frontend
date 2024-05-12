import type { Mastodon } from "megalodon";
import type { Account } from "~/types/mastodon/account";

export const useAccount = (
    client: MaybeRef<Mastodon | null>,
    accountId: MaybeRef<string | null>,
) => {
    if (!client) {
        return ref(null as Account | null);
    }

    const output = ref(null as Account | null);

    watchEffect(() => {
        if (toValue(accountId))
            toValue(client)
                ?.getAccount(toValue(accountId) ?? "")
                .then((res) => {
                    output.value = res.data;
                });
    });

    return output;
};
