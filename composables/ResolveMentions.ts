import type { Client } from "@versia/client";
import type { Account, Mention } from "@versia/client/types";

export const useResolveMentions = (
    mentions: Ref<Mention[]>,
    client: Client | null,
): Ref<Account[]> => {
    if (!client) {
        return ref([]);
    }

    const output = ref<Account[]>([]);

    watch(
        mentions,
        async () => {
            output.value = await Promise.all(
                toValue(mentions).map(async (mention) => {
                    const response = await client.getAccount(mention.id);
                    return response.data;
                }),
            );
        },
        { immediate: true },
    );

    return output;
};
