import type { LysandClient } from "@lysand-org/client";

type ExtendedDescription = {
    updated_at: string;
    content: string;
};

export const useExtendedDescription = (
    client: MaybeRef<LysandClient | null>,
) => {
    if (!ref(client).value) {
        return ref(null as ExtendedDescription | null);
    }

    const output = ref(null as ExtendedDescription | null);

    ref(client)
        .value?.getInstanceExtendedDescription()
        .then((res) => {
            output.value = res.data;
        });

    return output;
};
