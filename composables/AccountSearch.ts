import type { LysandClient } from "@lysand-org/client";
import type { Account } from "~/types/mastodon/account";

export const useAccountSearch = (
    client: MaybeRef<LysandClient | null>,
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
