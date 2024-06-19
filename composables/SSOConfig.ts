import type { Instance } from "@lysand-org/client/types";

export const useSSOConfig = (): Ref<Instance["sso"] | null> => {
    const instance = useInstance();

    return computed(() => instance.value?.sso || null);
};
