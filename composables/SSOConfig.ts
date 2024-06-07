import type { Instance } from "./Instance";

export const useSSOConfig = (): Ref<Instance["sso"] | null> => {
    const instance = useInstance();

    return computed(() => instance.value?.sso || null);
};
