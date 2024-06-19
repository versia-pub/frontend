import type { LysandClient } from "@lysand-org/client";
import type { Account, Mention } from "@lysand-org/client/types";

export const useResolveMentions = (
    mentions: Ref<Mention[]>,
    client: LysandClient | null,
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
