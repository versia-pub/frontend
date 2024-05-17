import { StorageSerializers } from "@vueuse/core";
import type { Mastodon } from "megalodon";
import type { Instance } from "~/types/mastodon/instance";

export type InstanceWithExtra = Instance & {
    banner: string | null;
    lysand_version: string;
    sso: {
        forced: boolean;
        providers: {
            id: string;
            name: string;
            icon?: string;
        }[];
    };
};

export const useInstance = () => {
    if (process.server) {
        return ref(null);
    }

    return useLocalStorage<InstanceWithExtra | null>("lysand:instance", null, {
        serializer: StorageSerializers.object,
    });
};
