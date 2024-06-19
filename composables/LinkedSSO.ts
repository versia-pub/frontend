import type { LysandClient } from "@lysand-org/client";

type SSOProvider = {
    id: string;
    name: string;
    icon: string;
};

export const useLinkedSSO = (client: MaybeRef<LysandClient>) => {
    if (!client) {
        return ref([] as SSOProvider[]);
    }

    const output = ref([] as SSOProvider[]);

    watchEffect(() => {
        toValue(client)
            ?.get<SSOProvider[]>("/api/v1/sso")
            .then((res) => {
                output.value = res.data;
            });
    });

    return output;
};
