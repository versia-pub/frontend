import type { LysandClient } from "@lysand-org/client";

// Return type of LysandClient.getInstance
export type Instance = Awaited<ReturnType<LysandClient["getInstance"]>>["data"];

export const useInstance = () => {
    const identity = useCurrentIdentity();

    return computed(() => identity.value?.instance);
};
