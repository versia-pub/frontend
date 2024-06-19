import type { LysandClient } from "@lysand-org/client";
import type { ExtendedDescription, Instance } from "@lysand-org/client/types";

export const useInstance = () => {
    const identity = useCurrentIdentity();

    return computed(() => identity.value?.instance);
};

export const useInstanceFromClient = (client: MaybeRef<LysandClient>) => {
    if (!client) {
        return ref(null as Instance | null);
    }

    const output = ref(null as Instance | null);

    watchEffect(() => {
        toValue(client)
            ?.getInstance()
            .then((res) => {
                output.value = res.data;
            });
    });
};

export const useTos = (client: MaybeRef<LysandClient>) => {
    if (!client) {
        return ref(null as ExtendedDescription | null);
    }

    const output = ref(null as ExtendedDescription | null);

    watchEffect(() => {
        toValue(client)
            ?.getInstanceTermsOfService()
            .then((res) => {
                output.value = res.data;
            });
    });

    return output;
};
