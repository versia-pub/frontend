import type { Mastodon } from "megalodon";
import type { Instance } from "~/types/mastodon/instance";

type InstanceWithExtra = Instance & {
    banner?: string;
    lysand_version?: string;
};

export const useInstance = (client: Mastodon | null) => {
    if (!client) {
        return ref(null as InstanceWithExtra | null);
    }

    const output = ref(null as InstanceWithExtra | null);

    client.getInstance().then((res) => {
        output.value = res.data;
    });

    return output;
};
