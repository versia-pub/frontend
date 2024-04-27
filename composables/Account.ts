import type { Mastodon } from "megalodon";
import type { Account } from "~/types/mastodon/account";

export const useAccount = (client: Mastodon | null, accountId: string) => {
    if (!client) {
        return ref(null as Account | null);
    }

    const output = ref(null as Account | null);

    client.getAccount(accountId).then((res) => {
        output.value = res.data;
    });

    return output;
};
