import type { Client } from "@versia/client";
import type { Instance, TermsOfService } from "@versia/client/schemas";
import type { z } from "zod";

export const useInstance = () => {
    return computed(() => identity.value?.instance);
};

export const useInstanceFromClient = (client: MaybeRef<Client>) => {
    if (!client) {
        return ref(null as z.infer<typeof Instance> | null);
    }

    const output = ref(null as z.infer<typeof Instance> | null);

    watchEffect(() => {
        toValue(client)
            ?.getInstance()
            .then((res) => {
                output.value = res.data;
            });
    });

    return output;
};

export const useTos = (client: MaybeRef<Client>) => {
    if (!client) {
        return ref(null as z.infer<typeof TermsOfService> | null);
    }

    const output = ref(null as z.infer<typeof TermsOfService> | null);

    watchEffect(() => {
        toValue(client)
            ?.getInstanceTermsOfService()
            .then((res) => {
                output.value = res.data;
            });
    });

    return output;
};
