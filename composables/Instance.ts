import type { Mastodon } from "megalodon";
import type { Instance } from "~/types/mastodon/instance";

type InstanceWithExtra = Instance & {
    banner?: string;
    lysand_version?: string;
};

export const useInstance = (client: MaybeRef<Mastodon | null>) => {
    if (!ref(client).value) {
        return ref(null as InstanceWithExtra | null);
    }

    const output = ref(null as InstanceWithExtra | null);

    ref(client)
        .value?.getInstance()
        .then((res) => {
            output.value = res.data;
        });

    return output;
};
