import type { LysandClient } from "@lysand-org/client";
import { StorageSerializers } from "@vueuse/core";

// Return type of LysandClient.getInstance
export type Instance = Awaited<ReturnType<LysandClient["getInstance"]>>["data"];

export const useInstance = () => {
    if (process.server) {
        return ref(null);
    }

    return useLocalStorage<Instance | null>("lysand:instance", null, {
        serializer: StorageSerializers.object,
    });
};
