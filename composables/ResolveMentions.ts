import type { Mastodon } from "megalodon";
import type { Account } from "~/types/mastodon/account";
import type { Mention } from "~/types/mastodon/mention";

export const useResolveMentions = async (
    mentions: Mention[],
    client: Mastodon | null,
): Promise<Ref<Account[]>> => {
    if (!client) {
        return ref([]);
    }
    return ref(
        await Promise.all(
            mentions.map(async (mention) => {
                const response = await client.getAccount(mention.id);
                return response.data;
            }),
        ),
    );
};
