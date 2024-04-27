import type { Mastodon } from "megalodon";

type ExtendedDescription = {
    updated_at: string;
    content: string;
};

export const useExtendedDescription = (client: Mastodon | null) => {
    if (!client) {
        return ref(null as ExtendedDescription | null);
    }

    const output = ref(null as ExtendedDescription | null);

    client.client.get("/api/v1/instance/extended_description").then((res) => {
        output.value = res.data;
    });

    return output;
};
