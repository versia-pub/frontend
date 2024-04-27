import type { Mastodon } from "megalodon";

type ExtendedDescription = {
    updated_at: string;
    content: string;
};

export const useExtendedDescription = (client: MaybeRef<Mastodon | null>) => {
    if (!ref(client).value) {
        return ref(null as ExtendedDescription | null);
    }

    const output = ref(null as ExtendedDescription | null);

    ref(client)
        .value?.client.get("/api/v1/instance/extended_description")
        .then((res) => {
            output.value = res.data;
        });

    return output;
};
