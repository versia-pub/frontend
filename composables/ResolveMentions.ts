import type { Mastodon } from "megalodon";
import type { Account } from "~/types/mastodon/account";
import type { Mention } from "~/types/mastodon/mention";

export const useResolveMentions = (
    mentions: Mention[],
    client: Mastodon | null,
): Ref<Account[]> => {
    if (!client) {
        return ref([]);
    }

    const output = ref<Account[]>([]);

    (async () => {
        output.value = await Promise.all(
            mentions.map(async (mention) => {
                const response = await client.getAccount(mention.id);
                return response.data;
            }),
        );
    })();

    return output;
};
