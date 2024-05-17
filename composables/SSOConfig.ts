import type { InstanceWithExtra } from "./Instance";

export const useSSOConfig = (): Ref<InstanceWithExtra["sso"] | null> => {
    const instance = useInstance();

    return computed(() => instance.value?.sso || null);
};
