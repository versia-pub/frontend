import type { Mastodon } from "megalodon";
import type { Account } from "~/types/mastodon/account";
import type { Mention } from "~/types/mastodon/mention";

export const useResolveMentions = (
    mentions: Ref<Mention[]>,
    client: Mastodon | null,
): Ref<Account[]> => {
    if (!client) {
        return ref([]);
    }

    const output = ref<Account[]>([]);

    watch(mentions, async () => {
        output.value = await Promise.all(
            toValue(mentions).map(async (mention) => {
                const response = await client.getAccount(mention.id);
                return response.data;
            }),
        );
    });

    return output;
};
