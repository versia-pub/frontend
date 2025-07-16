import type { Client } from "@versia/client";
import type { Account, Mention } from "@versia/client/schemas";
import type { z } from "zod";

export const useResolveMentions = (
    mentions: Ref<z.infer<typeof Mention>[]>,
    client: Client | null,
): Ref<z.infer<typeof Account>[]> => {
    if (!client) {
        return ref([]);
    }

    const output = ref<z.infer<typeof Account>[]>([]);

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
